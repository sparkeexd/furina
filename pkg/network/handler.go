package network

import (
	"bytes"
	"compress/flate"
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// Default HTTP client timeout duration.
const clientDefaultTimeout = 10 * time.Second

// Base handler for dealing with HTTP request processes.
// This ranges from sending HTTP requests to HoYoLAB endpoints, parsing responses, and setting cookies.
type HTTPHandler struct {
	Client http.Client
}

// Constructor.
func NewHTTPHandler() HTTPHandler {
	client := http.DefaultClient
	client.Timeout = clientDefaultTimeout
	client.Transport = &http.Transport{
		MaxIdleConns:        10,
		MaxIdleConnsPerHost: 2,
	}

	handler := HTTPHandler{Client: *client}
	return handler
}

// Sends a HTTP request.
// Returns a generic map from the unmarshalled response.
// Specific retcode errors are handled by their respective clients.
func (handler *HTTPHandler) Send(request Request, res any) error {
	// Build HTTP request.
	httpRequest, err := handler.createHttpRequest(request)
	if err != nil {
		return err
	}

	// Send HTTP request.
	response, err := handler.Client.Do(httpRequest)
	if err != nil {
		return err
	}

	defer response.Body.Close()

	// Parse response body into readable format.
	body, err := handler.parseResponse(response)
	if err != nil {
		return err
	}

	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("response error %s %s", request.endpoint, string(body))
	}

	json.Unmarshal(body, &res)
	return err
}

// Create HTTP request structure.
func (handler *HTTPHandler) createHttpRequest(request Request) (*http.Request, error) {
	var body io.Reader

	// JSON marshal request body.
	if request.body != nil {
		jsonData, err := json.Marshal(request.body)
		if err != nil {
			return nil, err
		}

		body = bytes.NewBuffer(jsonData)
	}

	// Create HTTP request.
	httpRequest, err := http.NewRequest(request.method, request.endpoint, body)
	if err != nil {
		return nil, err
	}

	// Add query parameters to HTTP request.
	query := httpRequest.URL.Query()
	for k, v := range request.params {
		query.Add(k, v)
	}

	httpRequest.URL.RawQuery = query.Encode()

	// Add headers to HTTP request.
	for k, v := range request.headers {
		httpRequest.Header.Set(k, v)
	}

	return httpRequest, nil
}

// Parse response body by decompressing content according to its encoding.
// HoYoLAB endpoints uses the standard gzip, deflate and brotli encodings.
func (handler *HTTPHandler) parseResponse(response *http.Response) ([]byte, error) {
	var err error
	var reader io.ReadCloser

	switch encoding := response.Header.Get("Content-Encoding"); encoding {
	case encodingGzip:
		reader, err = gzip.NewReader(response.Body)
		if err != nil {
			return nil, err
		}

	case encodingDeflate:
		reader = flate.NewReader(response.Body)

	default:
		reader = response.Body
	}

	defer reader.Close()

	body, err := io.ReadAll(reader)
	if err != nil {
		return nil, err
	}

	return body, nil
}

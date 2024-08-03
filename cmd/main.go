package main

import (
	"log"
	"os"
	"os/signal"

	"github.com/Scarlet-Spark/furina/bot"
	"github.com/Scarlet-Spark/furina/commands/hello"
)

func main() {
	log.Println("Creating discord bot session...")
	bot.CreateSession()

	log.Println("Adding commands...")
	bot.AddCommands(hello.Commands)

	// Event listener to stop the bot.
	log.Println("Bot is now running! Press Ctrl+C to exit.")
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	<-stop

	log.Println("Closing discord bot session...")
	bot.CloseSession()
}

package bot

import (
	"flag"
	"log"

	"github.com/Scarlet-Spark/furina/commands"
	"github.com/bwmarrin/discordgo"
)

var (
	// Discord bot session.
	session *discordgo.Session

	// Discord bot parameters.
	botToken = flag.String("token", "", "Bot access token.")
)

// Create discord bot session.
func CreateSession() {
	flag.Parse()

	var err error
	session, err = discordgo.New("Bot " + *botToken)
	if err != nil {
		log.Fatalf("Invalid bot parameters: %v", err)
	}

	session.AddHandler(func(s *discordgo.Session, r *discordgo.Ready) {
		log.Printf("Logged in as: %v#%v", s.State.User.Username, s.State.User.Discriminator)
	})

	err = session.Open()
	if err != nil {
		log.Fatalf("Cannot open the session: %v", err)
	}
}

// Register the slash command.
// Add a handler executes the registered handler if its corresponding command exists.
func AddCommands(commands map[string]commands.Command) {
	session.AddHandler(func(session *discordgo.Session, interaction *discordgo.InteractionCreate) {
		if command, exists := commands[interaction.ApplicationCommandData().Name]; exists {
			command.Handler(session, interaction)
		}
	})

	for _, v := range commands {
		_, err := session.ApplicationCommandCreate(session.State.User.ID, "", v.Command)
		if err != nil {
			log.Panicf("Cannot create '%v' command: %v", v.Command.Name, err)
		}
	}
}

// Close the session.
func CloseSession() {
	session.Close()
}

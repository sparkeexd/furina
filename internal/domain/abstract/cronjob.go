package abstract

import (
	"github.com/bwmarrin/discordgo"
	"github.com/sparkeexd/furina/internal/domain/entity"
)

// Service's cron jobs to be registered.
type JobService interface {
	Jobs(session *discordgo.Session) []entity.CronJob
}

import * as dotenv from 'dotenv';
import DiscordClient from "./DiscordClient"
import Cron, { CRON_INTERVALS } from "./Cron"

dotenv.config();


const discordClient = new DiscordClient()


discordClient.on('ready', async () => {
	await discordClient.sendMessage(DiscordClient.MESSAGES.UPDATE, DiscordClient.CHANNELS.CHANGELOG)
	
	//NYT Crossword updates at 10PM EST on weekdays and 6PM EST on weekends
	Cron.startJob(CRON_INTERVALS.WEEKDAY, async () => {
		await discordClient.sendMessage(DiscordClient.MESSAGES.PUZZLE, DiscordClient.CHANNELS.MAIN)
	})

	Cron.startJob(CRON_INTERVALS.WEEKEND, async () => {
		await discordClient.sendMessage(DiscordClient.MESSAGES.PUZZLE, DiscordClient.CHANNELS.MAIN)
	})
});

discordClient.on("message", async ({ content }) => {
	const parsedMessage = discordClient.parseMessage(content)

	switch (parsedMessage) {
		case "goml":
		case "#goml":
			await discordClient.sendMessage(DiscordClient.MESSAGES.GOML, DiscordClient.CHANNELS.MAIN)
		default:
	}
})

discordClient.login(process.env.TOKEN || "");


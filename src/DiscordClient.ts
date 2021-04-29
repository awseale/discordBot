import { Client, TextChannel } from 'discord.js';

class DiscordClient extends Client {
	static CHANNELS = {
		CHANGELOG: process.env.CHANGELOG_CHANNEL || "",
		MAIN: process.env.CHANNEL || ""
	}

    static MESSAGES = {
        UPDATE: "Ya boy is back and better than ever\nFor change notes, ask <@677740656747216916>",
	    PUZZLE: "Hey fellas! The NYT mini crossword just updated! Go get \'em!\nhttps://www.nytimes.com/crosswords/game/mini",
        GOML: "GET ON HIS LEVEL"
    }

    client: Client;

    constructor() {
        super()
        this.client = new Client()
    }

	async sendMessage(message: string, channelName: string) {
        if (channelName === DiscordClient.CHANNELS.CHANGELOG || channelName === DiscordClient.CHANNELS.MAIN) {
            const channel = await this.client.channels.cache.get(channelName) as TextChannel;
            channel.send(message)
        }
	}

    parseMessage(message: string): string {
        return message.toLowerCase().trim()
    }
}

export default DiscordClient
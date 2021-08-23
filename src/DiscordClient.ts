import { Client, TextChannel } from "discord.js";

export enum MESSAGES {
  UPDATE = "Ya boy is back and better than ever\nFor change notes, ask <@677740656747216916>",
  PUZZLE = "Hey fellas! The NYT mini crossword just updated! Go get 'em!\nhttps://www.nytimes.com/crosswords/game/mini",
  GOML = "GET ON HIS LEVEL",
}

class DiscordClient extends Client {
  static CHANNELS = {
    CHANGELOG: process.env.CHANGELOG_CHANNEL || "",
    MAIN: process.env.CHANNEL || "",
  };

  constructor() {
    super();
  }

  sendMessage = async (message: MESSAGES, channelName: string) => {
    const hasValidChannels =
      this.isValidChannel(DiscordClient.CHANNELS.CHANGELOG) && this.isValidChannel(DiscordClient.CHANNELS.MAIN);
    const channelNameMatches =
      channelName === DiscordClient.CHANNELS.CHANGELOG || channelName === DiscordClient.CHANNELS.MAIN;
    if (hasValidChannels) {
      if (channelNameMatches) {
        const channel = await this.channels.fetch(channelName);
        (channel as TextChannel)?.send(message);
      }
    }
  };

  parseMessage = (message: string): string => {
    return message.toLowerCase().trim();
  };

  isValidChannel = (channelName: string): boolean => {
    // channel ids seem to always be 18 length
    return channelName.length === 18;
  };
}

export default DiscordClient;

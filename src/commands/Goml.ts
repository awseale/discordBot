import { DMChannel, NewsChannel, TextChannel } from "discord.js";
import DiscordClient, { MESSAGES } from "../DiscordClient";

async function goml(client: DiscordClient, channel: DMChannel | TextChannel | NewsChannel): Promise<void> {
  if (channel instanceof DMChannel || channel.name !== DiscordClient.CHANNELS.MAIN) return;

  await client.sendMessage(MESSAGES.GOML, channel.name);
}

export default goml;

import * as dotenv from "dotenv";
dotenv.config();
import DiscordClient, { MESSAGES } from "./DiscordClient";
import Cron, { CRON_INTERVALS } from "./Cron";
import goml from "./commands/Goml";
import { Message } from "discord.js";

const discordClient = new DiscordClient();

discordClient.login(process.env.TOKEN || "");

discordClient.on("ready", async () => {
  console.log("eggy kibun");
  await discordClient.sendMessage(MESSAGES.UPDATE, DiscordClient.CHANNELS.CHANGELOG);

  //NYT Crossword updates at 10PM EST on weekdays and 6PM EST on weekends
  Cron.startJob(CRON_INTERVALS.WEEKDAY, async () => {
    await discordClient.sendMessage(MESSAGES.PUZZLE, DiscordClient.CHANNELS.MAIN);
  });

  Cron.startJob(CRON_INTERVALS.WEEKEND, async () => {
    await discordClient.sendMessage(MESSAGES.PUZZLE, DiscordClient.CHANNELS.MAIN);
  });
});

discordClient.on("message", async ({content, channel}: Message) => {
  const parsedMessage = discordClient.parseMessage(content);

  if (parsedMessage === "goml" || parsedMessage === "#goml") {
    await goml(discordClient, channel);
  }
});

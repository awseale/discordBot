import * as dotenv from "dotenv";
dotenv.config();
import DiscordClient, { MESSAGES } from "./DiscordClient";
import Cron, { CRON_INTERVALS } from "./Cron";

const discordClient = new DiscordClient();

discordClient.login(process.env.TOKEN || "");

discordClient.on("ready", async () => {
	onReady(); 
});

discordClient.on("message", async ({ content }) => {
	gomlReply(content);
});

function onReady() {
	console.log("ready");
	await discordClient.sendMessage(MESSAGES.UPDATE, DiscordClient.CHANNELS.CHANGELOG);

	Cron.startJob(CRON_INTERVALS.WEEKDAY, async () =>{
		postCrossword();
	});		

	Cron.startJob(CRON_INTERVALS.WEEKEND, async () =>{
		postCrossword();
	});
}

function postCrossword() {
	await discordClient.sendMessage(MESSAGES.PUZZLE, DiscordClient.CHANNELS.MAIN);
}

function gomlReply(content) {
	const parsedMessage = discordClient.parseMessage(content);

	if(parsedMessage === "goml" || parsedMessage === "#goml"){
		await discordClient.sendMessage(MESSAGES.GOML, DiscordClient.CHANNELS.MAIN);
	}
}

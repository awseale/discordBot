import * as dotenv from 'dotenv';
import { Client, User } from 'discord.js';
import * as cron from 'node-cron';

dotenv.config();

const client = new Client();

client.on('ready', async () => {

	console.log("This boy done logged in");

	const channelName = await client.channels.cache.get(process.env.CHANNEL || "");
	if(!channelName) {
		console.log("no channel name found");	
	}

	channelName.send("\'Sup crossword puzzlers, I\'m gonna be a bot to remind you when a new one drops, and potentially much more ;)");
	
	//NYT Crossword updates at 10PM EST on weekdays and 6PM EST on weekends
	//currently the bot will notify users at noon
		
	cron.schedule('* 19 * * Monday,Tuesday,Wednesday,Thursday,Friday', () =>{
		if(channelName){		
			channelName.send("Hey fellas! The NYT mini crossword just updated! Go get \'em!");
			channelName.send('https://www.nytimes.com/crosswords/game/mini');
		}
	});

	cron.schedule('* 15 * * Saturday,Sunday', () =>{
		if(channelName){
			channelName.client.user?.send('Hey fellas! The NYT mini crossword just updated! Go get \'em!');
			channelName.client.user?.send('https://www.nytimes.com/crosswords/game/mini');
		}
	});
});

client.login(process.env.TOKEN || "");

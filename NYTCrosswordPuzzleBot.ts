import * as dotenv from 'dotenv';
import { Client, User, TextChannel } from 'discord.js';
import * as cron from 'node-cron';

dotenv.config();

const client = new Client();

client.on('ready', async () => {

	

	const channelName = await client.channels.cache.get(process.env.CHANNEL || "");
	if(!channelName) {
		console.log("no channel name found");	
	}

	(channelName as TextChannel)?.send("Ya boy is back and better than ever");
	
	//NYT Crossword updates at 10PM EST on weekdays and 6PM EST on weekends
	cron.schedule('* * 19 * * Monday,Tuesday,Wednesday,Thursday,Friday', () =>{
		if(channelName){		
			(channelName as TextChannel)?.send("Hey fellas! The NYT mini crossword just updated! Go get \'em!");
			(channelName as TextChannel)?.send('https://www.nytimes.com/crosswords/game/mini');
		}
	});

	cron.schedule('* * 15 * * Saturday,Sunday', () =>{
		if(channelName){
			(channelName as TextChannel)?.send('Hey fellas! The NYT mini crossword just updated! Go get \'em!');
			(channelName as TextChannel)?.send('https://www.nytimes.com/crosswords/game/mini');
		}
	});
});

client.login(process.env.TOKEN || "");

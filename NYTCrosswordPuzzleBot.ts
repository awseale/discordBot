import * as dotenv from 'dotenv';
import { Client } from 'discord.js';
import * as cron from 'node-cron';

dotenv.config();

const client = new Client();

client.on('ready', () => {
	console.log("This boy done logged in");

	const channelName = client.channels.cache.get(process.env.CHANNEL);

	//NYT Crossword updates at 10PM EST on weekdays and 6PM EST on weekends
	//currently the bot will notify users at noon
	cron.schedule('* 19 * * Mon,Tue,Wed,Thur,Fri', () =>{
		channelName.send('https://www.nytimes.com/crosswords/game/mini');
	});

	cron.schedule('* 15 * * Sat, Sun', () =>{
		channelName.send('Hey fellas! The NYT mini crossword just updated! Go get \'em!');
		channelName.send('https://www.nytimes.com/crosswords/game/mini');
	});

});

client.login(process.env.TOKEN);

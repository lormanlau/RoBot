exports.run = (bot) => {
	bot.config = require('../config.json');
	//bot.sendServerCount();
	bot.syncServers();
	bot.startGameCycle();
	bot.awaitConsoleInput();

	bot.log(`${bot.user.username} is online and ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers!`);
}
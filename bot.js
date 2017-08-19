const Discord = require('discord.js');
const bot = new Discord.Client(require("./config.json").opts);
require('./funcs.js')(bot);
const readdir = require("fs").readdir;

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

readdir('./modules/', (err, files) => {
	bot.log(`Loading ${files.length} commands!`);
	files.forEach(f => {
		try {
			var name = require(`./modules/${f}`).name
			bot.commands.set(name, require(`./modules/${f}`));
			/*commandFile.aliases.forEach(alias => {
				bot.aliases.set(alias, commandFile.help.name);
			});*/
		} catch (e) {
			bot.log(`Unable to load command ${f}: ${e}`);
		}
	});
	bot.log(`Commands loaded!`);
});

readdir('./events/', (err, files) => {
	bot.log(`Loading ${files.length} events!`);
	files.forEach(file => {
		bot.on(file.split(".")[0], (...args) => {
			require(`./events/${file}`).run(bot, ...args);
		});
	});
	bot.log(`Events loaded!`);
});

bot.login(require("./config.json").token);
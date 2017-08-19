
exports.run = (bot, guild) => {
    bot.addServer(guild);
	bot.sendServerCount(bot);
    bot.user.setGame(config.prefix + 'help | ' + bot.guilds.size + ' Servers');
    bot.joinleavehook('join', guild)
}
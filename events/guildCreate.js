
exports.run = (bot, guild) => {
    bot.addServer(guild);
	bot.sendServerCount(bot);
    bot.user.setGame(bot.config.prefix + 'help | ' + bot.guilds.size + ' Servers');
    bot.joinleavehook('join', guild)
}

exports.run = (bot, guild) => {
    bot.removeServer(guild);
	bot.sendServerCount(bot);
    bot.user.setGame(bot.config.PREFIX + 'help | ' + bot.guilds.size + ' Servers');
    bot.joinleavehook('leave', guild)
}
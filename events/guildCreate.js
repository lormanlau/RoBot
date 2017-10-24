
exports.run = (bot, guild) => {
    bot.addServer(guild);
	bot.sendServerCount(bot);
    bot.joinleavehook('join', guild)
}
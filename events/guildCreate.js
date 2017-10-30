
exports.run = (bot, guild) => {
    setTimeout(function () {
        bot.addServer(guild);
        bot.sendServerCount(bot);
        bot.joinleavehook('join', guild)
    }, 3000)
}
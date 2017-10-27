
exports.run = (bot, guild, user) => {
    msg.guild.fetchAuditLogs({ options: { limit: 5 } }).then(logs => {
        var action = logs.entries.array()[0]
        if (action.executor == bot.user && action.target == user) {
            return;
        } else {
            
        }
    });

    bot.channels.get(bot.config.eventlogging).send({
        embed: {
            title: ":card_box: Emoji Deleted",
            fields: [{
                name: "Guild",
                value: emoji.guild.name,
                inline: true
            }, {
                name: "Name",
                value: `${emoji.name}`,
                inline: true
            }],
            timestamp: new Date(),
            color: "16711680"
        }
    })
}

exports.run = (bot, guild, user) => {
    msg.guild.fetchAuditLogs({ options: { limit: 5 } }).then(logs => {
        var action = logs.entries.array()[0]
        if (action.executor == bot.user && action.target == user) {
            return;
        } else {
            
        }
    });
}
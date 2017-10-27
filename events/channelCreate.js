
exports.run = (bot, channel) => {
    if (channel.guild)
        msg.channel.send({ embed: { title: ":card_box: Channel Created", fields: [{ name: "Guild", "value": channel.guild.name}], "timestamp": new Date() } })
    bot.channels.get(bot.config.eventlogging).send(`:card_box: **Channel Created** in ${channel.guild.name}!\n**Name:** ${channel.name}\n**Type:** ${channel.type}`)
}
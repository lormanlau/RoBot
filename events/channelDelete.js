
exports.run = (bot, channel) => {
    if (channel.guild)
        bot.channels.get(bot.config.eventlogging).send({ embed: { title: ":card_box: Channel Deleted", fields: [{ name: "Guild", value: channel.guild.name, inline:true }, { name: "Name", value: channel.name, inline:true }, { name: "Type:", value: channel.type, inline:true }], timestamp: new Date(), color: "16711680" } })
}
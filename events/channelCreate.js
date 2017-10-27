
exports.run = (bot, channel) => {
    if (channel.guild)
        bot.channels.get(bot.config.eventlogging).send({ embed: { title: ":card_box: Channel Created", fields: [{ name: "Guild", value: channel.guild.name }, { name: "Name", value: channel.name }, { name: "Type:", value: channel.type }], timestamp: new Date(), color: "#00FF00" } })
}
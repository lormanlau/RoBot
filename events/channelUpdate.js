
exports.run = (bot, oldchannel, newChannel) => {
    if (channel.guild && (oldChannel.name != newChannel.name || oldChannel.topic != newChannel.topic))
        bot.channels.get(bot.config.eventlogging).send({ embed: { title: ":arrows_clockwise: Channel Updated", fields: [{ name: "Guild", value: channel.guild.name, inline:true }, { name: "Old Name", value: oldChannel.name, inline:true }, { name: "New Name", value: newChannel.name, inline:true }, { name: "Old Topic", value: oldChannel.topic, inline:true }, { name: "New Topic", value: newChannel.topic, inline:true }, { name: "Type:", value: channel.type, inline:true }], timestamp: new Date(), color: "65280" } })
}
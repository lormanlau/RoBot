
exports.run = (bot, oldChannel, newChannel) => {
    if (oldChannel.guild && (oldChannel.name != newChannel.name || oldChannel.topic != newChannel.topic))
        bot.channels.get(bot.config.eventlogging).send({ embed: { title: ":arrows_clockwise: Channel Updated", fields: [{ name: "Guild", value: oldChannel.guild.name, inline:true }, { name: "Old Name", value: oldChannel.name, inline:true }, { name: "New Name", value: newChannel.name, inline:true }, { name: "Old Topic", value: oldChannel.topic || "None", inline:true }, { name: "New Topic", value: newChannel.topic || "None", inline:true }, { name: "Type:", value: oldChannel.type, inline:true }], timestamp: new Date(), color: "16776960" } })
}
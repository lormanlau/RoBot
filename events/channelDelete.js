
exports.run = (bot, channel) => {
    if (channel.guild)
        msg.channel.send({ embed: { title: ":card_box: Channel Deleted", fields: [{ name: "Guild", value: channel.guild.name }, { name: "Name", value: channel.name }, { name: "Type:", value: channel.type }], timestamp: new Date(), color: "#00FF00" } })
}
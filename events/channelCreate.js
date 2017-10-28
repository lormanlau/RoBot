
exports.run = (bot, channel) => {
    if (channel.guild)
        bot.channels.get(require('../config.json').eventlogging).send({ embed: { title: ":card_box: Channel Created", fields: [{ name: "Guild", value: channel.guild.name, inline:true }, { name: "Name", value: channel.name, inline:true }, { name: "Type:", value: channel.type, inline:true }], timestamp: new Date(), color: "65280" } })
}
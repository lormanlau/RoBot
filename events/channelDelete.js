
exports.run = (bot, channel) => {
    if(channel.guild)
        bot.channels.get(bot.config.eventlogging).send(`:card_box: **Channel Deleted** in ${channel.guild.name}!
                                                        Name: ${channel.name}
                                                        Type: ${channel.type}`)
}
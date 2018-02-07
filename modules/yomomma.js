var unirest = require('unirest'),
    Discord = require('discord.js');

module.exports = {
    name: 'yomomma',
    type: 'fun',
    usage: 'yomomma',
    permission: 1,
    help: 'Gets a yomomma joke.',
    main: function(bot, msg) {
        bot.checkForUpvote(msg).then(res => {
            if (res) {
                unirest.get('http://api.yomomma.info/')
                    .end(result => {
                        var yomomma = JSON.parse(result.body);
                        var embed = new Discord.RichEmbed()
                            .setFooter('Powered by yomomma.info')
                            .setTimestamp()
                            .setColor(msg.guild.me.displayColor)
                            .setTitle('Yomomma Joke')
                            .setDescription(yomomma.joke);

                        msg.channel.send({ embed: embed });
                    });
            } else {
                bot.promptForUpvote(msg, this.name);
            }
        });
    },
};

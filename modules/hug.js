var hugs = require('../data/hugs.json'),
    unirest = require('unirest');

module.exports = {
    name: 'hug',
    type: 'action',
    usage: 'hug <mention>',
    permission: 1,
    help: 'Hug someone :)',
    main: function(bot, msg) {
        var min = 0,
            max = hugs.length - 1;
        msg.reply(hugs[Math.floor(Math.random() * (max - min + 1)) + min]);
        unirest.get('https://api.weeb.sh/images/random')
            .headers({
                Authorization: 'Wolke ' + bot.config.weebsh,
            })
            .send({
                type: 'hug',
                filetype: 'gif',
            })
            .end(res => {
                msg.channel.send(hugs[Math.floor(Math.random() * (max - min + 1)) + min].body, {
                    embed: {
                        image: {
                            url: res.body.url,
                        },
                        color: msg.guild.me.displayColor,
                    },
                });
            });
    },
};

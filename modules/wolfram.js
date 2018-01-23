module.exports = {
    name: 'wolfram',
    type: 'utility',
    usage: 'wolfram <query>',
    permission: 1,
    help: 'Queries the Wolfram Alpha API.',
    main: function (bot, msg) {
        const wolfram = require('wolfram').createClient(bot.config.wolfram),
            { RichEmbed } = require('discord.js');
        bot.checkForUpvote(msg).then(res => {
            if (res) {
                msg.channel.send('Loading...').then(m => {
                    wolfram.query(msg.content, (err, result) => {
                        if (err) console.log(err);
                        if (result) console.log(result);
                        if (err || !result) return msg.edit('No results.');
                        var goodresults = result.reduce(function iter(r, a) {
                            if (a === null) {
                                return r;
                            }
                            if (Array.isArray(a)) {
                                return a.reduce(iter, r);
                            }
                            if (typeof a === 'object') {
                                return Object.keys(a).map(k => a[k]).reduce(iter, r);
                            }
                            return r.concat(a);
                        }, []);

                        const embed = new RichEmbed()
                            .setTitle('WolframAlpha API')
                            .setColor(0x00AE86)
                            .setThumbnail('http://collegian.com/wp-content/uploads/2015/08/wolfram-alpha.png')
                            .setFooter('Powered by Wolfram Alpha | Written by KhryptK', 'http://collegian.com/wp-content/uploads/2015/08/wolfram-alpha.png')
                            .setTimestamp();
                        if (goodresults[0] === undefined) {
                            embed.setDescription("Sorry, that input isn't in the WolframAlpha Database.");
                        } else {
                            console.log(goodresults);
                            embed.setURL(goodresults[3].toString());
                            embed.addField(goodresults[0].toString(), goodresults[2].toString(), true);
                            embed.addField(goodresults[5].toString(), goodresults[7].toString() || goodresults[8].toString(), true);
                        }

                        return m.edit({ embed });
                    });
                });
            } else {
                bot.promptForUpvote(msg, this.name);
            }
        });
    },
};

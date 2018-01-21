var pageNum, startAt;
const Discord = require('discord.js');

module.exports = {
    name: 'botlist',
    type: 'utility',
    usage: 'botlist <number>',
    permission: 1,
    help: 'Queries the Carbonitex API for information.',
    main: function(bot, msg) {
        require('unirest').get('https://www.carbonitex.net/discord/api/listedbots')
            .end(res => {
                let bots = res.body;
                bots.sort((a, b) => {
                    return Number(a.servercount) === Number(b.servercount) ? 0 : +(Number(a.servercount) < Number(b.servercount)) || -1;
                });

                if (msg.args[0] && !isNaN(msg.args[0])) pageNum = Number(msg.args[0]);
                else pageNum = 1;

                startAt = (pageNum - 1) * 10;

                var botList = new Discord.RichEmbed()
                    .setTitle(`Carbonitex Bot List | Page ${pageNum} of ${bots.length / 10}`);

                var content = '';

                for (var i = startAt; i < startAt + 10; i++) {
                    content += `**${i + 1}**: ${bots[i]} - ${bots[i].servercount} Servers`;
                }

                botList.setDescription(content);

                msg.channel.send({ embed: botList });
            });
    },
};

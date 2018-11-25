const Discord = require('discord.js');
var unirest = require('unirest');

module.exports = {
    name: 'toa',
    type: 'informational',
    usage: 'toa <team>',
    permission: 1,
    help: 'Querys The Orange Alliance API for information.',
    main: function (bot, m) {
        let teamKey = m.content.split(' ')[0];
        console.log('TOA: ' + teamKey);

        if (teamKey) {
            team(teamKey.trim());
        } else {
            m.channel.send('Please specify an argument! Accepted arguments: team');
        }

        function team(key) {
            var teaminfo = new Discord.RichEmbed();
            req('team/' + key).then(b => {
                if (!b[0]) return m.channel.send('This team does not exist!');
                teaminfo.setAuthor('FIRST® Tech Challenge Team #' + b[0].team_number, 'https://pbs.twimg.com/profile_images/1049159734249623553/SZ34vdcC_400x400.jpg', 'https://www.theorangealliance.org/teams/' + teamKey)
                    .setColor(0xff9800)
                    .addField('Name', b[0].team_name_short, true)
                    .addField('Rookie Year', b[0].rookie_year, true)
                    .addField('Location', b[0].city + ', ' + b[0].state_prov + ', ' + b[0].country, true)
                    .addField('Website', b[0].website || 'None', true)
                    .addField('Region', 'Part of the ' + b[0].region_key + ' Region', true)
                    .addField('TOA Page', 'https://theorangealliance.org/teams/' + key, true);
                // .addField('FTCRoot Page', 'http://www.ftcroot.com/teams/' + teamKey, true);
                sendEmbed(teaminfo);
                return null;
            });
        }

        function sendEmbed(embed) {
            embed.setFooter('Powered by The Orange Alliance')
                .setTimestamp();
            m.channel.send({ embed: embed })
                .then(msg => {
                    if (!m.content.endsWith('--nodel')) {
                        setTimeout(() => {
                            msg.delete();
                        }, 30000);
                    } else {
                        m.channel.send('This message will not autodelete.')
                            .then(msg2 => {
                                setTimeout(() => {
                                    msg2.delete();
                                }, 5000);
                            });
                    }
                });
        }

        function req(endpoint) {
            return new Promise(
                resolve => {
                    unirest.get('http://theorangealliance.org/api/' + endpoint)
                        .headers({ 'X-Application-Origin': bot.user.username, 'X-TOA-Key': bot.config.toa, 'Content-Type': 'application/json' })
                        .end(response => {
                            resolve(response.body);
                        });
                }
            );
        }
    },
};

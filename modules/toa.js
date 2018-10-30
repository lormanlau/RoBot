const Discord = require('discord.js');
var unirest = require('unirest');

module.exports = {
    name: 'toa',
    type: 'informational',
    usage: 'toa <arguments>',
    permission: 1,
    help: 'Querys The Orange Alliance API for information.',
    main: function(bot, m) {
        var curYear = new Date().getFullYear();
        var args = m.content.split(' ')[0];
        var teamNumber = m.content.split(' ')[1];
        console.log(args + ', ' + teamNumber);

        if (!isNaN(args)) {
            team(args);
        } else if (!isNaN(teamNumber)) {
            if (args === 'team') {
                team(teamNumber.trim());
            } else if (args === 'awards') {
                var year = m.content.split(' ')[2];
                if (isNaN(year)) {
                    year = curYear;
                }
            } else {
                m.channel.send('Please specify an argument! Accepted arguments: team');
            }
        }

        function team(num) {
            var teaminfo = new Discord.RichEmbed();
            req('team/' + num).then(b => {
                if (!b[0]) return m.channel.send('This team does not have any data on it, or it does not exist!');
                teaminfo.setAuthor('FIRST® Tech Challenge Team ' + num, 'https://pbs.twimg.com/profile_images/1049159734249623553/SZ34vdcC_400x400.jpg', 'https://www.theorangealliance.org/teams/' + num)
                    .setColor(0xff9800)
                    .addField('Name', b[0].team_name_short, true)
                    .addField('Rookie Year', b[0].rookie_year, true)
                    .addField('Location', b[0].city + ', ' + b[0].state_prov + ', ' + b[0].country, true)
                    .addField('Website', b[0].website || 'None', true)
                    .addField('Region', 'Part of the ' + b[0].region_key + ' Region', true)
                    .addField('TOA Page', 'https://theorangealliance.org/teams/' + num, true);
                    // .addField('FTCRoot Page', 'http://www.ftcroot.com/teams/' + num, true);
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

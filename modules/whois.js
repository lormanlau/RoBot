var whois = require('whois-json'),
    Discord = require('discord.js'),
    moment = require('moment');

module.exports = {
    name: 'whois',
    type: 'utility',
    usage: 'whois <domain>',
    permission: 1,
    help: 'Returns whois data for a domain.',
    main: function(bot, msg) {
        bot.checkForUpvote(msg).then(v => {
            if (v) {
                whois(msg.content, (err, res) => {
                    if (err) console.log(err);
                    if (res.domainName) {
                        msg.channel.send({
                            embed: new Discord.RichEmbed()
                                .setAuthor(`Whois domain records for ${res.domainName}`, null, 'https://github.com/mikemaccana/whois-json')
                                .addField('Domain Status', res.domainStatus)
                                .addField('Registrar', res.registrar, true)
                                .addField('Registrar Website', res.registrarUrl, true)
                                .addField('Registrar Email', res.registrarAbuseContactEmail || 'None', true)
                                .addField('Registrant', res.registrantName || 'Unknown', true)
                                .addField('Registrant Location', res.registrantStateProvince || 'Unknown', true)
                                .addField('Registrant Email', res.registrantEmail || 'Unknown', true)
                                .addField('Admin Name', res.adminName || 'Unknown', true)
                                .addField('Admin Location', res.adminStateProvince || 'Unknown', true)
                                .addField('Admin Email', res.adminEmail || 'Unknown', true)
                                .addField('Nameservers', res.nameServer, true)
                                .addField('Created', moment(res.creationDate).fromNow(), true)
                                .addField('Last Update', moment(res.updatedDate).fromNow(), true)
                                .addField('Expiry Date', moment(res.registryExpiryDate).fromNow(), true)
                                .setFooter(`Powered by whois-json`)
                                .setColor(msg.guild.me.displayColor)
                                .setTimestamp(),
                        });
                    } else {
                        msg.channel.send(`Unfortunately there are no whois records for ${msg.content}`);
                    }
                });
            } else {
                bot.promptForUpvote(msg, this.name);
            }
        });
    },
};

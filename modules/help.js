const Discord = require('discord.js');
module.exports = {
    name: 'help',
    type: 'core',
    usage: 'help <optional-arg>',
    permission: 1,
    help: 'Gives you the documentation for the bot\'s commands.',
    main: function(bot, msg) {
        if (!msg.args[0]) {
            /*
            msg.channel.send(':mailbox: Check your DMs!');
            const myCommands = bot.commands.filter(c => c.permission <= bot.permLevel(msg));
            var help = new Discord.RichEmbed();
            help.setTitle(bot.user.username + ' Command List')
                .setDescription(`Do ${prefix}help <commandname> for details`)
                .setColor([r, g, b]);
            myCommands.forEach(c => {
                if (help.fields.length < 25) {
                    help.addField(prefix + c.name, c.help, true);
                } else {
                    msg.author.send({ embed: help });
                    help = new Discord.RichEmbed()
                        .setColor([r, g, b])
                        .addField(prefix + c.name, c.help, true);
                }
            });
            help.setFooter(bot.user.username + ' Command List')
                .setTimestamp();
            msg.author.send({ embed: help });
            var invite = new Discord.RichEmbed()
                .setTitle(bot.user.username + ' Help Server')
                .setColor([r, g, b])
                .setDescription('Come join us at https://discord.gg/8QebTbk for support and more!')
                .setTimestamp();
            msg.author.send({ embed: invite });
            */
            try {
                const myCommands = bot.commands.filter(c => c.permission <= bot.permLevel(msg));
                const commandNames = myCommands.keyArray();
                const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

                let currentCategory = '';
                let output = `= Command List =\n\n[Use ${msg.prefix}help <commandname> in a guild channel for details]\n`;
                const sorted = myCommands.array().sort((p, c) => p.type > c.type ? 1 : p.name > c.name && p.type === c.type ? 1 : -1);
                sorted.forEach(c => {
                    const cat = toProperCase(c.type);
                    if (currentCategory !== cat) {
                        output += `\u200b\n== ${cat} ==\n`;
                        currentCategory = cat;
                    }
                    output += `${msg.prefix}${c.name}${' '.repeat(longest - c.name.length)} | ${c.help}\n`;
                });
                output += `\n[Come join us at https://discord.gg/8QebTbk for support and more!]`;
                msg.channel.send(':mailbox: Check your DMs!');

                var outputArr = output.split('\u200b'); // eslint-disable-line
                output = '';
                outputArr.forEach(a => {
                    if ((output + a).length > 2000) {
                        msg.channel.send(output, { code: 'asciidoc' });
                        output = '';
                    } else {
                        output += outputArr[0];
                    }
                });
                msg.author.send(output, { code: 'asciidoc' });
                // , split: { char: '\u200b' } });
            } catch (error) {
                if (error.message === 'Cannot send messages to this user') {
                    msg.reply('I cannot send you the commands message, as it appears you have DMs disabled.');
                } else {
                    bot.error(error);
                }
            }
        } else {
            let command = msg.args[0];
            if (bot.commands.has(command)) {
                command = bot.commands.get(command);
                var helpCommand = new Discord.RichEmbed();
                helpCommand.setTitle(command.name)
                    .setFooter(bot.user.username)
                    .setTimestamp()
                    .addField('Category', `${toProperCase(command.type)}`, true)
                    .addField('Description', `${command.help}`, true)
                    .addField('Usage', `${msg.prefix}${command.usage}`, true)
                    .setColor(msg.guild.me.displayHexColor)
                    .addField('Need more help?', 'Join our support server at https://discord.gg/8QebTbk!');
                /* if (command.conf.aliases != "") {
                    helpCommand.addField('Aliases', `${command.conf.aliases.join(', ')}`)
                }*/
                msg.channel.send({ embed: helpCommand });
            }
        }

        function toProperCase(m) {
            return m.replace(/([^\W_]+[^\s-]*) */g, txt => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        }
    },
};

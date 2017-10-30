const Discord = require('discord.js');
module.exports = {
    name: 'help',
    type: 'core',
    usage: 'help <optional-arg>',
    permission: 1,
    help: 'Gives you the documentation for the bot\'s commands.',
    main: function (bot, msg) {
        var r = Math.floor(Math.random() * 256),
            g = Math.floor(Math.random() * 256),
            b = Math.floor(Math.random() * 256);
        bot.getPrefix(msg).then(prefix => {
            if (!msg.args[0]) {
                msg.channel.send(":mailbox: Check your DMs!")
                const myCommands = bot.commands.filter(c => c.permission <= bot.permLevel(msg));
                var help = new Discord.RichEmbed();
                help.setTitle(bot.user.username + " Command List")
                    .setDescription(`Do ${prefix}help <commandname> for details`)
                    .setColor([r, g, b])
                myCommands.forEach(c => {
                    if (help.fields.length < 25)
                        help.addField(prefix + c.name, c.help)
                    else {
                        msg.author.send({ embed: help });
                        help = new Discord.RichEmbed()
                            .setColor([r, g, b])
                            .addField(prefix + c.name, c.help);
                    }
                });
                help.setFooter(bot.user.username + " Command List")
                    .setTimestamp()
                msg.author.send({ embed: help });
                var invite = new Discord.RichEmbed()
                    .setTitle(bot.user.username + "Help Server")
                    .setDescription("Come join us at https://discord.gg/8QebTbk for support and more!")
                    .setTimestamp()
                msg.author.send({ embed: invite })
            } else {
                let command = msg.args[0];
                if (bot.commands.has(command)) {
                    command = bot.commands.get(command);
                    var helpCommand = new Discord.RichEmbed();
                    helpCommand.setTitle(command.name)
                        .addField('Description', `${command.help}`)
                        .addField('Usage', `${prefix}${command.usage}`)
                        .setColor([r, g, b])
                        .addField("Join our support server!", "Come join us at https://discord.gg/8QebTbk for support and more!")
                    /*if (command.conf.aliases != "") {
                        helpCommand.addField('Aliases', `${command.conf.aliases.join(', ')}`)
                    }*/
                    msg.channel.send({ embed: helpCommand });
                };
            };
        })
    }
};
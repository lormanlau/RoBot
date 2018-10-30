module.exports = {
    name: 'npm',
    type: 'informational',
    usage: 'npm <package-name>',
    permission: 1,
    help: 'Gives you information about an npm package',
    main: function (bot, msg) {
        var info = require("package-info"),
            { MessageEmbed } = require("discord.js");

        var pkg = await info(args.join(" "));
        msg.channel.send({
            embed: new MessageEmbed()
                .setAuthor(
                    pkg.name,
                    "https://authy.com/wp-content/uploads/npm-logo.png",
                    `https://npmjs.com/package/${pkg.name}`
                )
                .setDescription(pkg.description)
                .setFooter("Powered by package-info")
                .setTimestamp()
                .setColor(msg.guild.me.displayHexColor)
                .addField("Author", pkg.author, true)
                .addField("Version", pkg.version, true)
                .addField("License", pkg.license || "None", true)
        });
    },
};

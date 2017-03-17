module.exports = {
	main: function(bot, message) {
		var help = `RoBot v2.0.0

General commands:

rules: Returns the rules of the server
ping: Pings the bot
server: Gives info about the server
user <optional-mention>: Gives info about yourself, or the mentioned user.
strawpoll <question>|<opt1, opt2, opt3, etc> : Creates a strawpoll with the specified question and options
urban <word>: Searches for the word in Urban Dictionary
tba <arguments>: Querys the TBA database for information
stats: Gives info about the server statistics
giveme {list}: Gives the user a specified allowed role, adding list gives the roles allowed
xkcd {num}: Returns the current XKCD comic, or that number if specifiec.


Adminstrative commands (requires the command user to have permissions):

kick <user>: kicks a given user
ban <user>: bans a given user
give <role> <user>: gives a role to a user
prune <amount>: prunes a certain amount of messages
restart: restarts the bot
take <role> <user>: takes a role from a user
`;
		message.author.sendCode('x1', help)
	}
};

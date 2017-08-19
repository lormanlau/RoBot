var request = require('request')
var xml2js = require('xml2js')

module.exports = {
	name: 'fact',
    type: 'fun',
	usage: 'fact',
	permission: 1,
	help: 'Returns a random fact.',
	main: function(bot, msg) {
        request('http://www.fayd.org/api/fact.xml', function (error, response, body) {
            if (response.statusCode === 200) {
                xml2js.parseString(body, function (err, result) {
                    try {
                        msg.channel.send(result.facts.fact[0])
                    } catch (e) {
                        msg.channel.send('The API returned an unconventional response.\n' + e)
                    }
                })
            }
        })
    }
}
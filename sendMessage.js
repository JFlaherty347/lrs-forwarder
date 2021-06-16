const https = require('https');
const path = require('path');

const removeXAPImistakes = require(path.resolve( __dirname,'./removeXapiMistakes'));

module.exports =
{
	sendMessage: function(data) 
	{
		console.log("Working with data: " + JSON.stringify(data));

		fixed_data = removeXAPImistakes(data);
		stringified_data = JSON.stringify(fixed_data)

		console.log("Final data attempting to send: " + stringified_data);

		const options = 
		{
			hostname: process.env.LRSF_HOSTNAME,
			auth: process.env.LRSF_AUTH,
			path: process.env.LRSF_PATH,
			method: 'POST',
			headers: 
			{
				'Content-Type': 'application/json',
				'X-Experience-API-Version': '1.0.3'
			}
		}

		const req = https.request(options, res => 
		{
			console.log(`statusCode: ${res.statusCode}`)

			res.on('stringified_data', d => 
			{
				console.log('Result ' + d)
			})
		})

		req.on('error', error => 
		{
			console.error(error)
		})

		req.write(stringified_data)
		req.end()

		return true
	}
};
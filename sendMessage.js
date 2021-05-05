const https = require('https')

module.exports =
{
	sendMessage: function(data) 
	{
		data = JSON.stringify(data)

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

			res.on('data', d => 
			{
				console.log('Result ' + d)
			})
		})

		req.on('error', error => 
		{
			console.error(error)
		})

		req.write(data)
		req.end()

		return true
	}
};
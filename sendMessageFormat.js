const https = require('https')

module.exports =
{
	sendMessage: function(data) 
	{
		data = JSON.stringify(data)

		const options = 
		{
			hostname: 'myLRS.com', // change this with your real info
			auth: 'user-aka-key:pass-aka-secret', // change this with your real info
			path: '/lrs/myLRSurl/statements', // change this with your real info
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
				console.log('Result: ' + d)

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
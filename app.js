const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const path = require('path');
const TinCan = require('tincanjs');
const cors = require('cors');
const sendMessage = require(path.resolve( __dirname, './sendMessage'));

const PORT = process.env.PORT || 3030

class LRS_forwarder
{

	constructor()
	{
		// var lrs = LRSloader.getLRS();
	}

	async create(data)
	{
		var status = sendMessage.sendMessage(data);

		return status
	}

	async find()
	{
		console.log("Successfully gotten")
		return { 'status': 200 };
	}
}

const app = express(feathers());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.configure(express.rest());
app.configure(socketio());
app.use('/LRSforwarder', new LRS_forwarder())

app.use(express.errorHandler());

app.on('connection', connection =>
	app.channel('everybody').join(connection)
);

app.publish(data => app.channel('everybody'));

app.listen(PORT).on('listening', () =>
	console.log('Feathers server listening on port ' + PORT)
);
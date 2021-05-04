const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

var TinCan = require('tincanjs');
var LRSloader = require('./LRSloader');
var sendMessage = require('./sendMessage');

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

app.listen(3030).on('listening', () =>
	console.log('Feathers server listening on localhost:3030')
);
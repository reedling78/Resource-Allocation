var express = require('express')
	, hb = require('handlebars')
	, app = express.createServer()
	, socket = require('socket.io')
	, io = socket.listen(app)
	, data = {}
	, port = process.env.PORT || 3000
	, pg = require('pg')
	, connectionString = 'postgres://srboupnqgnwceq:lVyLMZaQNzFBBcXyLlUMF7MIoz@ec2-54-243-139-234.compute-1.amazonaws.com:5432/d7rtclh2oqjsl9'
	, employeeData = require('./serverjs/static').klt()
	, projectData = require('./serverjs/Project').projects()
	, db = require('./serverjs/Project');

//Express Config
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.set('view engine', 'handlebars');
	app.set("view options", { layout: false });
	app.set('views', __dirname + '/public');
});

//DB

var client = new pg.Client(connectionString);
client.connect();


//Socket IO Config
io.configure(function () { 
	io.set("transports", ["xhr-polling"]); 
	io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {

	socket.on('get projects', function (data) {
		socket.emit('receive projects', projectData);
	});

	socket.emit('static', employeeData);

	socket.on('save', function (data) { 
		socket.broadcast.emit('save', data);
	});

});

//Default route
app.get('/', function(req, res) {
	res.render('default.html', data);
});


//Start web server
app.listen(port);

var express = require('express')
	, hb = require('handlebars')
	, app = express.createServer()
	, socket = require('socket.io')
	, io = socket.listen(app)
	, data = {}
	, port = process.env.PORT || 3000
	, employeeData = require('./serverjs/static').klt()
	, projectData = require('./serverjs/Project').projects()
	, db = require('./serverjs/Project');

if (process.env.REDISTOGO_URL) {
	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var redis = require("redis").createClient(rtg.port, rtg.hostname);

	redis.auth(rtg.auth.split(":")[1]); 
} else {
	var redis = require("redis").createClient();
}

//Express Config
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.set('view engine', 'handlebars');
	app.set("view options", { layout: false });
	app.set('views', __dirname + '/public');
});

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
		redis.set(data.name, data.color, redis.print);
		socket.broadcast.emit('save', db.getAllProjects());
	});

});

//Default route
app.get('/', function(req, res) {
	res.render('default.html', data);
});


//Start web server
app.listen(port);

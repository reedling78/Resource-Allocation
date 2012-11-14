var express = require('express')
	, hb = require('handlebars')
	, app = express.createServer()
	, socket = require('socket.io')
	, io = socket.listen(app)
	, data = {}
	, port = process.env.PORT || 3000
	, employeeData = require('./serverjs/static').klt()
	, projectData = require('./serverjs/projects').projects();


app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	//app.register('.html', hb);
	//app.register('.css', hb);
	app.set('view engine', 'handlebars');
	app.set("view options", { layout: false });
	app.set('views', __dirname + '/public');
});

io.configure(function () { 
	io.set("transports", ["xhr-polling"]); 
	io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
	
	socket.emit('projects', projectData);

	socket.emit('static', employeeData);

	socket.on('save', function (data) {
		socket.broadcast.emit('save', data);
	});

});

//Default route
app.get('/', function(req, res) {
	res.render('default.html', data);
});



//Default route
app.get('/day.css', function(req, res) {
	//data.css = 'body { background-color:red; }';
	res.render('/Styles/custom.css', data);
	//res.render('default.html', data);
});

//Start web server
app.listen(port);

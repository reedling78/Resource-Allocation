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
	, db = require('./serverjs/db');

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

// var q = 'CREATE TABLE projects ( '
//     + 'id          SERIAL CONSTRAINT firstkey PRIMARY KEY, '
//     + 'name        varchar(50), '
//     + 'description        text, '
//     + 'empId   	   integer, '
//     + 'color       varchar(10), '
//     + 'startdate   date, '
//     + 'enddate     date, '
//     + 'day         integer, '
//     + 'duration    integer )'
 
// console.log(q);



// var q = 'INSERT INTO projects (name, description, empId, color, startdate, enddate)'
//     + 'VALUES (\'Parts Town\', \'Yojimbo\', 1, \'Red\', \'11/19/2012\', \'11/19/2012\')'

// client.query(q, function(err, result){ 
// 	console.log('############# result');
// 	console.log(result);
// 	console.log('############# err');
// 	console.log(err);
// });



// //Socket IO Config
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
	//res.render('default.html', data);
});


app.get('/selectAllProjects', function(req, res){
	db.selectAllProjects(client, function(result){
		res.json(result);
	});
});

app.get('/selectCurrentProjects', function(req, res){
	db.selectCurrentProjects(client, function(result){
		res.json(result);
	});
});

app.get('/deleteProjects/:id', function(req, res){
	db.deleteProjects(client, req.params.id, function(result){
		res.json(result);
	});
});

app.get('/insertprojects', function(req, res){

	var q = 'INSERT INTO projects (name, description, empId, color, startdate, enddate)'
	    + 'VALUES (\'Parts Town\', \'Yojimbo\', 1, \'Red\', \'10/19/2012\', \'10/19/2012\')'

    query = client.query(q, function(err, result){
    	if(err != null){
    		res.json(err);
    	} else {
    		res.json(result);
    	}
    });

})


//Start web server
app.listen(port);

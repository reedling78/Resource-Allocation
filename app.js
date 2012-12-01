var express = require('express')
	, hb = require('handlebars')
	, app = express.createServer()
	, socket = require('socket.io')
	, io = socket.listen(app)
	, port = process.env.PORT || 3000 
	, pg = require('pg')
	, kltconnectionString = 'postgres://eyntiddmneohgz:_8BgzBNNQyuQmIV4FGHdpShJBM@ec2-54-243-190-93.compute-1.amazonaws.com:5432/d8i534na3mvk0r'
	, connectionString = 'postgres://srboupnqgnwceq:lVyLMZaQNzFBBcXyLlUMF7MIoz@ec2-54-243-139-234.compute-1.amazonaws.com:5432/d7rtclh2oqjsl9'
	, employeeData = require('./serverjs/static').klt()
	, db = require('./serverjs/db')
	, data = {};

//Express Config
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.register('.html', hb);
	app.set('view engine', 'handlebars');
	app.set("view options", { layout: false });
	app.set('views', __dirname + '/public');
});

//DB
var client = new pg.Client(kltconnectionString); 
client.connect(); 

//Socket IO Config
io.configure(function () { 
	io.set("transports", ["xhr-polling"]); 
	io.set("polling duration", 5); 
});

io.sockets.on('connection', function (socket) {

	socket.on('get projects', function (data) {
		if(data !== undefined){
			db.updateProjects(client, data, function(err){
				db.selectCurrentProjects(client, function(result){
					socket.broadcast.emit('receive projects', result);
					socket.emit('receive projects', result);
				});
			});
		} else {
			db.selectCurrentProjects(client, function(result){
				socket.emit('receive projects', result);
			});
		}	
	});

	socket.on('send new projects', function (proj) { 
		db.insertProjects(client, proj, function(err){
			db.selectCurrentProjects(client, function(result){
				socket.broadcast.emit('receive projects', result);
			});
		});
	});

	socket.on('delete projects', function (id) { 
		db.deleteProjects(client, id, function(err){
			db.selectCurrentProjects(client, function(result){
				socket.broadcast.emit('receive projects', result);
			});
		});
	});


	socket.emit('static', employeeData);

});

//Default route
app.get('/', function(req, res) {
	res.render('index.html', data); 
});

//Default route
app.get('/login', function(req, res) {
	res.render('login.html', data); 
});

app.get('/get/login/:password', function(req, res){
    var passwords = [
      'rushrules',
      'rush rules',
      'rushrocks',
      'rush rocks'
    ]

    var response = {
    	success : false
    };
    
    for (var i = passwords.length - 1; i >= 0; i--) {
    	if(passwords[i] == req.params.password.toLowerCase()){
    		response.success = true;
    	}
    };

    res.json(response);
})

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

app.get('/truncateProjects', function(req, res){
	db.truncateProjects(client, function(result){
		res.json(result);
	});
});

app.get('/insertProjects', function(req, res){ 
	db.insertProjects(client, proj[0], function(result){
		res.json(result);
	});
});


app.get('/createProjectsTable', function(req, res){ 
	db.createProjectsTable(client, function(result){
		res.json(result);
	});
});

app.get('/insertTestProjects', function(req, res){

	var proj = [
		{
			id:1,
			name:'ACG',
			desc:'My AAA Account Redesign', 
			empId:1,
			color: 'Orange',
			startdate: '11/19/2012',
			enddate: '11/23/2012'
		},
		{
			id:2,
			name:'Parts Town',
			desc:'My AAA Account Redesign', 
			empId:2,
			color: 'Purple',
			startdate: '11/26/2012',
			enddate: '11/30/2012'
		},
		{
			id:3,
			name:'Takada',
			desc:'My AAA Account Redesign', 
			empId:1,
			color: 'Red',
			startdate: '12/03/2012',
			enddate: '12/07/2012'
		},
		{
			id:4,
			name:'PLS',
			desc:'My AAA Account Redesign', 
			empId:3,
			color: 'Lime',
			startdate: '12/10/2012',
			enddate: '12/14/2012'
		}
	];

	
	db.insertProjects(client, proj[0], function(result){
		console.log(result);
		
	});

	db.insertProjects(client, proj[1], function(result){
		console.log(result);
		
	});

	db.insertProjects(client, proj[2], function(result){
		console.log(result);
			
	});

	db.insertProjects(client, proj[3], function(result){
		console.log(result);
	});

	return [];

})


//Start web server
app.listen(port);

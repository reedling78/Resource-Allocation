var express = require('express')
	, hb = require('handlebars')
	, app = express()
	, data = {}
	, port = process.env.PORT || 3000;


app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	//app.register('.html', hb);
	app.set('view engine', 'handlebars');
	app.set("view options", { layout: false });
	app.set('views', __dirname + '/public');
});

//Default route
app.get('/', function(req, res) {
	res.render('default.html', data);
});


//Start web server
app.listen(port, function() {
	console.log('Listening on:', port);
});

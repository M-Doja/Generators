var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/angular'));
app.use(express.static(__dirname + '/node_modules/angular-ui-router/release'));
app.use(express.static(__dirname + '/node_modules/bootstrap'));
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://localhost:' + port);
});
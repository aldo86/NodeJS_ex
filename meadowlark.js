var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');

var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
	req.query.test === '1';
	next();
});

app.get('/', function(req, res){
	res.render('home');
});
app.get('/about', function(req, res){
//var randomFortune =
//fortunes[Math.floor(Math.random() * fortunes.length)];
//res.render('about', { fortune: randomFortune });
res.render('about', { fortune: fortune.getFortune(),
					  pageTestScript: '/qa/tests-about.js' });
});

app.get('/tours/hood-river', function(req, res){
res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
res.render('tours/request-group-rate');
});

app.use(express.static(__dirname + '/public'));

// custom 404 page
app.use(function(req, res){
	res.status(404);
	res.render('404');
});
// custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
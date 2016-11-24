var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware')

var app = express();


app.use(sassMiddleware({
    /* Options */
    src: __dirname + '/public/sass',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'compressed',
    prefix:  ''  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/> 
}));



//configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use middleware

app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

//define routes


app.use(require('./router'));

//start the server
var port = process.env.PORT || 1337;

app.listen(port, function(){
	console.log('test express on: ' +port);
});


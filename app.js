require('dotenv').config()
var express = require('express'),
	app 	= express(),
	AWS = require('aws-sdk'),
	// cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator');

AWS.config.update({
  region: "us-east-1"
});

app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

var DB  = new AWS.DynamoDB.DocumentClient();

var table = "Recipes";
var params = {
	TableName: table,
	Key:{
	    "_userId": process.env.USER_ID
	}
};

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  // res.send('hello world');
  	DB.get(params, function(err, data) {
		if(err){
			console.log(err);
			res.send("There was an error finding the user.");
		} else {
			console.log(data);
			if(data["Item"]){
				res.render('index', { title: 'Hey', recipes: data["Item"] })
			} else {
				res.send("There was an error finding the user.");
			}
		}
	});	
});

app.get('/edit/:recipe', function (req, res) {
  	var recipe = req.params.recipe.trim();
  	params.AttributesToGet = [recipe];

  	DB.get(params, function(err, data) {
		if(err){
			console.log(err);
			res.send("There was an error finding the user.");
		} else {
			console.log(data);
			if(data["Item"]){
				res.render('edit', { title: 'Hey', recipe: data["Item"][recipe] })
			} else {
				res.send("There was an error finding the user.");
			}
		}
	});	
})

app.post('/edit/:recipe', function (req, res) {
	
	var errors = req.validationErrors();
	if (errors) {
	    // Render the form using error information
	}
	else {
	   // There are no errors so perform action with valid data (e.g. save record).
	}
});
// GET method route
// app.get('/', function (req, res) {
//   res.send('GET request to the homepage')
// })

// POST method route
// app.post('/', function (req, res) {
//   res.send('POST request to the homepage')
// })

app.listen(3001, function () {
  console.log('Chef app listening on port 3001!')
})
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  // res.send('hello world');
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

// GET method route
// app.get('/', function (req, res) {
//   res.send('GET request to the homepage')
// })

// POST method route
// app.post('/', function (req, res) {
//   res.send('POST request to the homepage')
// })

app.listen(3000, function () {
  console.log('Chef app listening on port 3000!')
})
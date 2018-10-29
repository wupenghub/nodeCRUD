var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public/', express.static('./public/'));
app.use('/node_modules/', express.static('./node_modules/'));
app.engine('html', require('express-art-template'));
app.get('/', function (req, res) {
    res.render('index.html');
});
app.listen(3000, function () {
    console.log('running.....')
});
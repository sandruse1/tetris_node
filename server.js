const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash')

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'NAIc3nuF', saveUninitialized : true, resave: true}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

// app.use('/', function (req, res) {
//     res.send('hello express');
// });

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('server run on port ' + port);
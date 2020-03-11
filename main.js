var express = require('express');
var app = express(); //express.Router랑 대응 
var bodyParser = require('body-parser');
var session = require('express-session');
//var FileStore = require('session-file-store')(session);
var MySQLStore = require('express-mysql-session')(session);
// //DB에 저장하는게 더 안전 여기바꾸기

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store:new MySQLStore({
        host:'localhost',
        port: 3306,
        user:'team05',
        password:'team05',
        database:'team05'
    })
  }));

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth'); 

app.use('/',indexRouter);
app.use('/topic',topicRouter); // '/topic'으로 시작되는 주소들에게 topicRouter라고하는 미들웨어를 적용하겠다.
app.use('/auth',authRouter);

// //없는 페이지
// app.use(function(req, res, next) {
//     res.status(404).send('Sorry cant find that!');
//   });


app.listen(3000);

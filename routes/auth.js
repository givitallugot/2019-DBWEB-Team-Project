var express = require('express');
var router = express.Router();
var search = require('../lib/search');
var db = require('../lib/db');

router.get('/login',function(request,response){
    search.home_login(request, response);
});

router.post('/login_process',function(request,response){
    var user = {
        Uid: request.body.ID,
        password:request.body.password,
        displayName:request.body.displayName
    };
    console.log(user);
    var sql = 'SELECT IFNULL(MAX(users.Uid),\'nouser\') as IsUser FROM users WHERE Uid=? AND password=?';

    db.query(sql,[user.Uid,user.password], function(err,results){
        if(err){
            response.redirect(`/`);
        } 
        else if(results[0].IsUser=='nouser'){
            response.redirect(`/`);
        } 
        else {
            request.session.is_logined = true;
                request.session.save(function(){
                response.redirect(`/`);
                });
        }
    });

});

router.get('/register',function(request,response){
    search.home_register(request, response);
});

router.get('/logout',function(request,response){
    request.session.destroy(function(err){
        response.redirect('/');
    });
});

router.post('/register_process',function(request,response){
        var user = {
            Uid: request.body.ID,
            password:request.body.password,
            displayName:request.body.displayName
        };
        console.log(user);
        var sql = 'INSERT INTO users SET ?';
        db.query(sql,user,function(err,results){
            if(err){
                console.log(err);
                response.status(500);
            } else{
                    request.session.save(function(){
                    response.redirect('/');
                    });
            }
        });

});

/*
router.post('/register_process',function(request,response){
    var post = request.body;
    var email = post.email;
    var pwd1 = post.pwd;
    var pwd2 = post.pwd2;
    var displayName = post.displayName;
    if(email === authData.email && password === authData.password){
        request.session.is_logined = true;
        request.session.nickname = authData.nickname;
        request.session.save(function(){
        response.redirect(`/`);
        });

    } else{
        response.send('Who?');
    }
});
*/
module.exports = router;
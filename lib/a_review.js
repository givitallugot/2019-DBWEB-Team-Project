var template = require('./a_template');
var db = require('./db');
var url = require('url');
var auth = require('../lib/auth');

exports.report_reputation = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);

    db.query(`SELECT * FROM Movie_Actor WHERE id=?`, [queryData.id], function(error1, movie_actor){
        if(error1){
            throw error1;
        }
        db.query(`SELECT * FROM Movie_Reputation WHERE actor_name=?`, [movie_actor[0].actor_name], function(error2, movie_repu){
            if(error2){ 
                throw error2;
            }
            response.send(template.r_resultTable(movie_actor, movie_repu,ASUI));
        })
    })
}

exports.new_reputation = function(request, response){
    if(!auth.IsOwner(request,response)){
        response.redirect('/');
        return false;
    }
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);

    db.query(`SELECT * FROM Movie_Actor WHERE id=?`, [queryData.id], function(error, movie_actor){
        if(error){
            throw error;
        }
        response.send(template.new_formTable(queryData.id, movie_actor,ASUI));
    })
}

exports.new_process_reputation = function(request, response){
    if(!auth.IsOwner(request,response)){
        response.redirect('/');
        return false;
    }
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM Movie_Actor WHERE id=?`, [queryData.id], function(error1, movie_actor){
        if(error1){
            throw error1;
        }
        db.query(`INSERT INTO Movie_Reputation(actor_name, points, comment) VALUES(?, ?, ?)`, 
            [movie_actor[0].actor_name, queryData.points, queryData.comment], function(error2){
            if(error2){
                throw error2;
            }
            response.writeHead(302, {Location: `http://localhost:3000/topic/reputation?category=act_report&id=${movie_actor[0].id}`});
            response.end();
        })
    })
}

exports.update_reputation = function(request, response){
    if(!auth.IsOwner(request,response)){
        response.redirect('/');
        return false;
    }
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);


    db.query(`SELECT * FROM Movie_Reputation WHERE id=?`, [queryData.id], function(error1, movie_repu){
        if(error1){
            throw error1;
        }
        db.query(`SELECT * FROM Movie_Actor WHERE actor_name=?`, [movie_repu[0].actor_name], function(error2, movie_actor){
            if(error2){
                throw error2;
            }
            response.send(template.update_formTable(movie_actor[0].id, movie_repu,ASUI));
        })
    })
}

exports.update_process_reputation = function(request, response){
    if(!auth.IsOwner(request,response)){
        response.redirect('/');
        return false;
    }
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM Movie_Actor WHERE id=?`, [queryData.a_id], function(error1, movie_actor){
        if(error1){
            throw error1;
        }
        db.query(`UPDATE Movie_Reputation SET points=?, comment=? WHERE id=?`, 
            [queryData.points, queryData.comment, queryData.id], function(error2){
            if(error2){
                throw error2;
            }
            response.writeHead(302, {Location: `http://localhost:3000/topic/reputation?category=act_report&id=${movie_actor[0].id}`});
            response.end();
        })
    })
}

// query 두 개(첫 번째 쿼리가 안될리는 없음, 상대적으로 중요한 del에 넣기)가 실행되면 reset index query 실행되도록!
exports.delete_process_reputation = function(request, response){
    if(!auth.IsOwner(request,response)){
        response.redirect('/');
        return false;
    }
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.beginTransaction(function(err1){
        if (err1) {
            throw err1;
        }
        db.query(`SELECT * FROM Movie_Actor WHERE id=?`, [queryData.a_id], function(error1, movie_actor){
            if (error1) {
                console.error(error1);
                db.rollback(function(){
                    console.error('rollback error1');
                    throw error1;
                });
            }
            db.query(`DELETE FROM Movie_Reputation WHERE id=?`, [queryData.id], function(error2){
                if (error2) {
                    console.error(error2);
                    db.rollback(function(){
                        console.error('rollback error2');
                        throw error2;
                    });
                }
                db.commit(function(err2){
                    if (err2) {
                        console.error(err2);
                        db.rollback(function () {
                           console.error('rollback err2');
                            throw err2;
                         });
                     }
                     response.writeHead(302, {Location: `http://localhost:3000/topic/reputation?category=act_report&id=${movie_actor[0].id}`});
                     response.end();
                })
            })
        })
    });
}
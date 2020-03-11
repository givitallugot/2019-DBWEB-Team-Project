var template = require('./m_template');
var db = require('./db');
var url = require('url');
var auth = require('../lib/auth');
exports.report_review = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);

    db.query(`SELECT * FROM Movie_Information WHERE id=?`, [queryData.id], function(error1, movie_info){
        if(error1){
            throw error1;
        }
        db.query(`SELECT * FROM Movie_Review WHERE title=?`, [movie_info[0].title], function(error2, movie_review){
            if(error2){ 
                throw error2;
            }
            response.send(template.r_resultTable(movie_info, movie_review,ASUI));
        })
    })
}

exports.new_review = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);

    //다른 링크들도 하기!!!!!
    if(!auth.IsOwner(request,response)){
        // response.redirect(`/topic/review?category=${queryData.category}&id=${queryData.id}`);
        response.writeHead(302, {Location: `http://localhost:3000/topic/review?category=star_report&id=${queryData.id}`});
        response.end();
        return false;
    }

    db.query(`SELECT * FROM Movie_Information WHERE id=?`, [queryData.id], function(error, movie_info){
        if(error){
            throw error;
        }
        response.send(template.new_formTable(queryData.id, movie_info,ASUI));
    })
}


exports.new_process_review = function(request, response){
    if(!auth.IsOwner(request,response)){
        response.redirect('/');
        alert("You should login first!");
        return false;
    }
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM Movie_Information WHERE id=?`, [queryData.id], function(error1, movie_info){
        if(error1){
            throw error1;
        }
        db.query(`INSERT INTO Movie_Review(title, points, comment) VALUES(?, ?, ?)`, 
            [movie_info[0].title, queryData.points, queryData.comment], function(error2){
            if(error2){
                throw error2;
            }
            response.writeHead(302, {Location: `http://localhost:3000/topic/review?category=star_report&id=${movie_info[0].id}`});
            response.end();
        })
    })
}

exports.update_review = function(request, response){
    if(!auth.IsOwner(request,response)){
        response.redirect('/');
        return false;
    }
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);

    db.query(`SELECT * FROM Movie_Review WHERE id=?`, [queryData.id], function(error1, movie_review){
        if(error1){
            throw error1;
        }
        db.query(`SELECT * FROM Movie_Information WHERE title=?`, [movie_review[0].title], function(error2, movie_info){
            if(error2){
                throw error2;
            }
            response.send(template.update_formTable(movie_info[0].id, movie_review,ASUI));
        })
    })
}

exports.update_process_review = function(request, response){
    if(!auth.IsOwner(request,response)){
        response.redirect('/');
        alert("You should login first!");
        return false;
    }
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM Movie_Information WHERE id=?`, [queryData.m_id], function(error1, movie_info){
        if(error1){
            throw error1;
        }
        db.query(`UPDATE Movie_Review SET points=?, comment=? WHERE id=?`, 
            [queryData.points, queryData.comment, queryData.id], function(error2){
            if(error2){
                throw error2;
            }
            response.writeHead(302, {Location: `http://localhost:3000/topic/review?category=star_report&id=${movie_info[0].id}`});
            response.end();
        })
    })
}

// query 두 개(첫 번째 쿼리가 안될리는 없음, 상대적으로 중요한 del에 넣기)가 실행되면 reset index query 실행되도록!
exports.delete_process_review = function(request, response){
    if(!auth.IsOwner(request,response)){
        response.redirect('/');
        alert("You should login first!");
        return false;
    }
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.beginTransaction(function(err1){
        if (err1) {
            throw err1;
        }
        db.query(`SELECT * FROM Movie_Information WHERE id=?`, [queryData.m_id], function(error1, movie_info){
            if (error1) {
                console.error(error1);
                db.rollback(function(){
                    console.error('rollback error1');
                    throw error1;
                });
            }
            db.query(`DELETE FROM Movie_Review WHERE id=?`, [queryData.id], function(error2){
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
                     response.writeHead(302, {Location: `http://localhost:3000/topic/review?category=star_report&id=${movie_info[0].id}`});
                     response.end();
                })
            })
        })
    });
}
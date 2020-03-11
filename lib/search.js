var template = require('./search_template');
var db = require('./db');
var url = require('url');
var auth = require('../lib/auth');

exports.home_login = function(request, response){
    response.send(template.HOME_LOGIN());
}
exports.home_register = function(request, response){
    response.send(template.HOME_REGISTER());
}

exports.result_movie = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);

    //console.log(queryData);
    db.query(`SELECT * FROM Movie_Information WHERE title=?`, [queryData.search], function(error1, movie_info){
        if(error1){
            throw error1;
        }
        db.query(`SELECT * FROM Movie_Distributor WHERE title=?`, [queryData.search], function(error2, movie_distributor){
            if(error2){
                throw error2;
            }
            //console.log(movie_distributor);
            db.query(`SELECT title, AVG(points) as avg_point, count(points) as review_num FROM Movie_Review GROUP BY title Having title=?`, [queryData.search], function(error3, movie_review_sum){
                if(error3){
                    throw error3;
                }
                //console.log(movie_review_sum);
                response.send(template.m_resultTable(movie_info, movie_distributor, movie_review_sum,ASUI));
            })
        })
    })
}

exports.result_director = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);

    db.query(`SELECT * FROM Movie_Director WHERE director_name=?`, [queryData.search], function(error, direc_info){
        if(error){
            throw error;
        }
        response.send(template.dr_resultTable(direc_info,ASUI));
    })
}

exports.result_actor = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);
    db.query(`SELECT * FROM Movie_Actor WHERE actor_name=?`, [queryData.search], function(error, actor_info){
        if(error){
            throw error;
        }
        response.send(template.ac_resultTable(actor_info,ASUI));
    })
}

exports.result_distributor = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);

 
    db.query(`SELECT * FROM Movie_Distributor WHERE id=?`, [queryData.id], function(error, distributor_info){
        if(error){
            throw error;
        }
        response.send(template.ds_resultTable(distributor_info,ASUI));
    })
}
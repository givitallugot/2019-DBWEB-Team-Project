var express = require('express');
var router = express.Router();
var url = require('url');
var search = require('../lib/search');
var m_review = require('../lib/m_review');
var a_review = require('../lib/a_review');
var auth = require('../lib/auth');

// Movie review
router.get('/review',function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var ASUI = auth.StatusUI(request,response);
    
    if(queryData.category == "star_del"){
        m_review.delete_process_review(request, response);
    } else if(queryData.category == "star_new"){
        m_review.new_review(request, response);
    } else if(queryData.category == "star_upd"){
        m_review.update_review(request, response);
    } else {
        m_review.report_review(request, response);
    }
});

router.get('/new_review', function(request,response){
    m_review.new_process_review(request, response);
});

router.get('/update_review', function(request,response){
    m_review.update_process_review(request, response);
});

// Actor reputation review
router.get('/reputation',function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    
    if(queryData.category == "act_del"){
        a_review.delete_process_reputation(request, response);
    } else if(queryData.category == "act_new"){
        a_review.new_reputation(request, response);
    } else if(queryData.category == "act_upd"){
        a_review.update_reputation(request, response);
    } else {
        a_review.report_reputation(request, response);
    }
});

router.get('/new_reputation', function(request,response){
    a_review.new_process_reputation(request, response);
});

router.get('/update_reputation', function(request,response){
    a_review.update_process_reputation(request, response);
});

router.get('/',function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
  
    if(queryData.category == "Movie"){
      search.result_movie(request, response);
    }
    else if(queryData.category == "Actor"){
      search.result_actor(request, response);
    }
    else if(queryData.category == "Director"){
      search.result_director(request, response);
    }
    else {
      search.result_distributor(request, response);
    }
});

module.exports = router;
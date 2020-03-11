var express = require('express');
var router = express.Router();
var template = require('../lib/search_template');
var auth = require('../lib/auth');

router.get('/',function(request,response){
    console.log(request.session);
    var ASUI = auth.StatusUI(request,response); 
    response.send(template.HOME(ASUI));
});

module.exports = router;
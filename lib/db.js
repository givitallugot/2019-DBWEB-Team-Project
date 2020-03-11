var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'team05',
  password : 'team05',
  database : 'team05'
});
db.connect();
module.exports = db;

// exports; 여러개 내보낼 때
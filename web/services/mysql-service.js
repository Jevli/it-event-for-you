var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost:3306',
  user     : 'root@localhost',
  password : 'password',
  database : 'it_events'
});

connection.connect()

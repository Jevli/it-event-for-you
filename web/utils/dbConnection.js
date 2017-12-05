const mysql = require('mysql')

const pool = mysql.createPool({
  host : '192.168.99.100',
  user : 'root',
  port : '3306',
  password : 'password',
  database : 'it_events'
})

const db = {
  get: (table, cb) => pool.query('SELECT * FROM ??', [table],  cb),
  create: (table, data, cb) => pool.query('INSERT INTO ?? SET ?', [table, data], cb)
}

module.exports = db

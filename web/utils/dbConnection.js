const mysql = require('mysql')

const pool = mysql.createPool({
  host : 'localhost',
  user : 'root',
  port : '3306',
  password : 'password',
  database : 'it_events'
})

const db = {
  get: (table, cb) => pool.query('SELECT * FROM ??', [table],  cb),
  //get: (table, value, key, cb) => pool.query('SELECT * FROM ?? WHERE ? = ?', [table, value, key], cb),
  create: (table, data, cb) => pool.query('INSERT INTO ?? SET ?', [table, data], cb),
  //delete: (table, value, key, cb) => pool.query('DELETE FROM ?? WHERE ? = ?', [table, value, key], cb),
  delete: (table, cb) => pool.query('DELETE FORM ??', [table], cb)
}

module.exports = db

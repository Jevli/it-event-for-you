const db = require('../utils/dbConnection')

const User = {
  getUsers: (cb) => db.get('users', cb),
  getUserById: (id, cb) => db.get('users', 'userid', id, cb),
  createUser: (data, cb) => db.create('users', data, cb)
}

module.exports = User

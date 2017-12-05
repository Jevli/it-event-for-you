const db = require('../utils/dbConnection')

const User = {
  getUsers: (cb) => db.get('users', cb),
  createUser: (data, cb) => db.create('users', data, cb)
}

module.exports = User

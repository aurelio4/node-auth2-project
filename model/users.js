const db = require('../data/dbConnection')

module.exports = {
  find,
  findBy,
  registerUser
}

function find() {
  return db('users').select('users.username', 'users.department')
}

function findBy(filter) {
  return db('users').where(filter).first()
}

function registerUser(user) {
  return db('users').insert(user, 'id')
}
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.string('username', 128).notNullable().unique().index()
    table.string('password', 258).notNullable()
    table.string('department', 128).notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
};
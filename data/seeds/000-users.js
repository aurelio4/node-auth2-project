exports.seed = function (knex) {
  const users = [{
      username: "normaluser",
      password: "qweasd",
      department: "marketing"
    },
    {
      username: "normaluser2",
      password: "qweasd",
      department: "marketing"
    },
    {
      username: "normaluser3",
      password: "qweasd",
      department: "engineering"
    }
  ]

  return knex('users').insert(users)
};
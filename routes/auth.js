const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../model/users')

const restricted = require('../middleware/restricted')

const ServerException = require('../error/ServerException')
const InvalidCredentialsException = require('../error/InvalidCredentialsException')

router.post('/register', async (req, res, next) => {
  try {
    const {
      username,
      password,
      department
    } = req.body
    const rounds = process.env.BCRYPT_ROUNDS || 8

    if (username && password && department) {
      const hash = bcrypt.hashSync(password, rounds)
      const register = await Users.registerUser({
        username: username,
        password: hash,
        department: department
      })
      res.status(201).json({
        success: `registered account id:${register}`
      })
    } else {
      next(new InvalidCredentialsException('missing data'))
    }
  } catch (err) {
    console.error(err)
    next(new ServerException())
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const {
      username,
      password
    } = req.body
    if (username && password) {
      const user = await Users.findBy({
        username
      })
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user)
        res.status(200).json({
          success: 'logged in',
          token
        })
      } else {
        next(new InvalidCredentialsException('missing data'))
      }
    } else {
      next(new InvalidCredentialsException())
    }
  } catch (err) {
    console.error(err)
    next(new ServerException())
  }
})

router.get('/users', restricted, async (req, res, next) => {
  try {
    const users = await Users.find()
    res.status(200).json(users)
  } catch (err) {
    console.error(err)
    next(new ServerException())
  }
})

function createToken(user) {
  const jwtSecret = process.env.JWT_SECRET || 'jwtsecret123'
  const payload = {
    sub: user.id,
    username: user.username,
    department: user.department
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router
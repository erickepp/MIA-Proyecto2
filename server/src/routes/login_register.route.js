const { Router } = require('express')
require('dotenv').config()

const router = Router()
const { login, register } = require('../controllers/login_register.controller')

router.post('/', login)

router.post('/register', register)

module.exports = router

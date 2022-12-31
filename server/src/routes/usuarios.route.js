const { Router } = require('express')
require('dotenv').config()

const router = Router()
const { getUsers, deleteUser } = require('../controllers/usuarios.controller')

router.get('/', getUsers)

router.post('/delete', deleteUser)

module.exports = router
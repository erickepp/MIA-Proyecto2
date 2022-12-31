const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const cors = require('cors')

app.use(express.json({limit: '50mb'}))
app.use(cors())
app.use(fileUpload({useTempFiles: true}))

app.use('/login', require('./routes/login_register.route'))
app.use('/usuarios', require('./routes/usuarios.route'))

module.exports = app

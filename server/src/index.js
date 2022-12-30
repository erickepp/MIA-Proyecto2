const app = require('./app')
const fs = require('./middleware/fs')
const cognito = require('./middleware/cognito')
require('dotenv').config()

const PORT = process.env.PORT || 3200

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD;
const EMAIL = process.env.EMAIL

const admin = {
    type:'admin',
    username: USER,
    email: EMAIL,
    password: PASSWORD
};

(async () => {
    await fs.write('usuarios.json', [admin])
    await cognito.signUpCognito({body: admin})
})()

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

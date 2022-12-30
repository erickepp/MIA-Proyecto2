const { signInCognito, signUpCognito } = require('../middleware/cognito')
const { uploadFile } = require('../middleware/s3')
const fs = require('../middleware/fs')
let usuarios = [];

(async () => {
    usuarios = await fs.read('usuarios.json')
})()

const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body
    let user = null

    for (let i in usuarios) {
        if (usuarios[i].username === usernameOrEmail || usuarios[i].email === usernameOrEmail) {
            if (usuarios[i].password === password) {
                user = usuarios[i]
                break
            } else if (usuarios.length-1 == i) {
                res.json({
                    status: false,
                    msg: 'Contraseña incorrecta',
                    user: {}
                })
                return
            }
        }
    }

    if (user) {
        await signInCognito(user, res);
    } else {
        res.json({
            status: false,
            msg: 'Nombre de usuario o correo incorrecto',
            user: {}
        })
    }
}

const register = async (req, res) => {
    const { username, email } = req.body

    for (let i in usuarios) {
        if (usuarios[i].username === username || usuarios[i].email === email) {
            res.json({
                status: false,
                msg: `${usuarios[i].username === username ? 'Nombre de usuario' : 'Correo electronico'} no disponible`,
                user: usuarios[i]
            })
            return
        }
    }

    await signUpCognito(req, res)
    await uploadFile(req.files['image'])
    req.body.image = `https://appweb-201602627-p2.s3.amazonaws.com/${req.files['image'].name}`
    usuarios.push(req.body)
    await fs.write('usuarios.json', usuarios)

    res.json({
        status: true,
        msg: 'Usuario registrado',
        user: req.body
    })
}

module.exports = {
    login,
    register
}

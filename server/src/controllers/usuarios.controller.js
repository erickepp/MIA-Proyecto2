const { deleteUserCognito } = require('../middleware/cognito')
const { deleteFile } = require('../middleware/s3')
const fs = require('../middleware/fs');

const getUsers = async (req, res) => {
    const usuarios = await fs.read('usuarios.json')
    let users = usuarios.filter(user => user.type !== 'admin')

    res.json({
        status: true,
        msg: 'Usuarios',
        users
    })
}

const deleteUser = async (req, res) => {
    const username = req.body.username
    const usuarios = await fs.read('usuarios.json')

    for(let i in usuarios) {
        if (usuarios[i].username === username) {
            const user = usuarios.splice(i, 1)[0]
            await deleteFile(user.image.substring(user.image.lastIndexOf('/') + 1))
            await fs.write('usuarios.json', usuarios)
            res.json({
                status: true,
                msg: 'Usuario eliminado',
                user
            })
            // await deleteUserCognito(user, res)
            return
        }
    }

    res.json({
        status: false,
        msg: 'Usuario no eliminado',
        user: {}
    })
}

module.exports = {
    getUsers,
    deleteUser
}

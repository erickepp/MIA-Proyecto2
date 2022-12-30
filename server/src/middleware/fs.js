const { readFile, writeFile } = require('fs/promises')
const path = `${__dirname}/../registros/`

const read = async (fileName) => {
    const file = await readFile(`${path}${fileName}`, 'utf-8')
    return JSON.parse(file)
}

const write = async (fileName, data) => {
    await writeFile(`${path}${fileName}`, JSON.stringify(data, null, 2), 'utf-8')
}

module.exports = {
    read,
    write
}

const http = require('http')
const { getUsers, getUser, createUser, updateUser, removeUser } = require('./controller/userController')

const server = http.createServer((req, res) => {
    if(req.url === '/users' && req.method === 'GET') {
        getUsers(req, res)
    } else if(req.url.match(/\/users\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        getUser(req, res, id)
    } else if(req.url === '/users' && req.method === 'POST') {
        createUser(req, res)
    } else if(req.url.match(/\/users\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        updateUser(req, res, id)
    } else if(req.url.match(/\/users\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        removeUser(req, res, id)
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Page not found'}))
    }
})

const PORT = process.ENV || 3000

server.listen(PORT, () => console.log(`WORK: ${PORT}`))


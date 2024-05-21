const User = require('../models/userModel')
const { getPostData } = require('../utils')

//Route GET /users
async function getUsers(req, res) {
    try {
        const users = await User.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users)) 
    } catch (error) {
        console.log(error)
    }
}

//Route GET /users/:id
async function getUser(req, res, id) {
    try {
        const user = await User.findById(id)
        if(!id) {
            res.writeHead(404, {"Content-Type": "application/json"})
            res.end(JSON.stringify({message: 'User not found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(user))
        }
    } catch (error) {
        console.log(error)
    }
}

//Route POST /users
async function createUser(req, res) {
    try {
        const body = await getPostData(req)

        const { name, age } = JSON.parse(body)
        const user = {
            name,
            age
        }

        const newUser = await User.create(user)
        res.writeHead(201, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newUser))

    } catch (error) {
        console.log(error)
    }
}

//Route PUT /users/:id
async function updateUser(req, res, id) {
    try {
        const user = await User.findById(id)

        if(!user) {
            res.writeHead(404, {"Content-Type": "application/json"})
            res.end(JSON.stringify({message: 'User not found'})) 
        } else {
            const body = await getPostData(req)

            const { name, age } = JSON.parse(body)
            const userData = {
                name: name || user.name,
                age: age || user.age
            }

            const updatedUser = await User.update(id, userData)
            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updatedUser))
        }
    } catch (error) {
        console.log(error)
    }
}

//Route DELETE /users/:id
async function removeUser(req, res, id) {
    try {
      const user = await User.findById(id)
      console.log('user', user)
      
      if(!user) {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'User not found'}))
      } else {
        await User.remove(id)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: `User ${user.name} removed`}))
      }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    removeUser
}
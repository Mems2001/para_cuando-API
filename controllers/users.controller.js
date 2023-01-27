const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const UsersService = require('../services/users.service')
const usersService = new UsersService()
const profilesServices = require('../services/profiles.service')
const profilesService = new profilesServices()
const rolesServices = require('../services/roles.service')
const rolesService = new rolesServices()

const getUsers = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await usersService.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addUser = async (request, response, next) => {
  try {
    let { body } = request
    let user = await usersService.createUser(body)
    if (user) {
      return response.status(201).json({ 
        message: 'User successfully created' ,
        User: {
          first_name: user.newUser.first_name ,
          last_name: user.newUser.last_name ,
          username: user.newUser.username ,
          email: user.newUser.email
        }
      })
    }
  } catch (error) {
    next(
      response.status(400).json({
        message: error.message,
        fields: {
          first_name: 'String',
          last_name: 'String',
          email: 'example@example.com',
          username: 'String',
          password: 'String',
          country_id: 'uuid'
        },
      })
    )
  }
}

const getUser = async (request, response, next) => {
  const id  = request.params.user_id
  
  usersService.getUser(id)
    .then(data => {
      if (data) {
        response.status(200).json(data)
      } else {
        response.status(404).json({message: 'Invalid ID'})
      }
    })
    .catch(err => {
      next(response.status(400).json({message: err.message}))
    })
}

const putUser = async (request, response, next) => {
  try {
    const id = request.params.user_id
    const altId = request.user.id
    if (id === altId) {
      let { first_name , last_name , username} = request.body
      if (first_name && last_name && username) {
        let user = await usersService.updateUser(id,{first_name , last_name , username})
        if (user) {
          return response.status(200).json({ message: 'User updated' , results: user })
        } else {
          return response.status(404).json({message: 'Invalid ID'})
        }
      } else {
        return response.json({
          message: 'All fields must be filled' ,
          fiels: {
            first_name: 'String' ,
            last_name: 'String' ,
            username: 'String'
          }
        })
      }
    } else {
      return response.status(401).json({message: 'Permission denied'})
    }
  } catch (error) {
    next(error)
  }
}

const removeUser = async (request, response, next) => {
  try {
    const id = request.params.user_id
    const altId = request.user.id
    // Admins can delete any user
    const profiles = await profilesService.findOwnProfileByUserID(altId)
    const roleAdmin = await rolesService.findRoleByName('admin')
    let isAdmin = false
    // console.log(profiles)
    for (let profile of profiles) {
      if (profile.role_id === roleAdmin.id) {
        isAdmin = true
      }
    }
    if (isAdmin) {
      let user = await usersService.removeUser(id)
      if (user) {
        return response.status(200).json({ results: user, message: 'removed' })        
      } else {
        return response.status(404).json({message: 'Invalid ID'})
      }
    } else if (id === altId) {
      let user = await usersService.removeUser(id)
      return response.status(200).json({ results: user, message: 'removed' })
    } else {
      return response.status(401).json({message: 'Permission denied'})
    }
  } catch (error) {
    next(error)
  }
}
const findUserByEmail = async (request, response, next) => {
  try {
    let { email } = request.body
    let user = await usersService.findUserByEmail(email)
    return response.json({ results: user })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getUsers,
  addUser,
  getUser,
  putUser,
  removeUser,
  findUserByEmail,
}

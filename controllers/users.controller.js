const UsersService = require('../services/users.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const usersService = new UsersService()

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
      return response.status(201).json({ results: user })
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
        },
      })
    )
  }
}

const getUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let users = await usersService.getUserOr404(id)
    return response.json({ results: users })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let user = await usersService.updateUser(id, body)
    return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const removeUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let user = await usersService.removeUser(id)
    return response.json({ results: user, message: 'removed' })
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
  updateUser,
  removeUser,
  findUserByEmail,
}

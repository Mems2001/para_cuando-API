const usersServices = require('../services/users.service')
const userService = new usersServices()
const { comparePassword } = require('../utils/crypto')

const checkUsersCredentials = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email)
    const verifyPassword = comparePassword(password, user.password)
    if (verifyPassword) {
      return user
    }
    return null
  } catch (error) {
    return null
  }
}
//
module.exports = {checkUsersCredentials}

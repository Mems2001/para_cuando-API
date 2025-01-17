const uuid = require('uuid')

const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const { hashPassword } = require('../utils/crypto')

const rolesServices = require('../services/roles.service')
const rolesSerivce = new rolesServices()

class UsersService {
  constructor() {}

  async findAndCount(query) {
    const options = {
      where: {},
      attributes: {
        exclude: ['updated_at', 'created_at'],
      },
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const users = await models.Users.findAndCountAll(options)
    return users
  }

  async createUser({ first_name, last_name, email, username, password , country_id }) {
    const transaction = await models.sequelize.transaction()
    const publicRole = await rolesSerivce.findRoleByName('public')

    try {
      let newUser = await models.Users.create(
        {
          id: uuid.v4() ,
          first_name,
          last_name,
          email,
          username,
          password: hashPassword(password),
        } ,
        { transaction }
      )
      let newProfile = await models.Profiles.create({
        id: uuid.v4() ,
        user_id: newUser.id ,
        role_id: publicRole.id ,
        country_id
      } , {transaction})

      await transaction.commit()
      return {newUser , newProfile}
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getUserOr404(id) {
    let user = await models.Users.findByPk(id)

    if (!user) throw new CustomError('Not found User', 404, 'Not Found')

    return user
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getUser(id) {
    let user = await models.Users.findByPk(id, { raw: true })
    return user
  }

  async updateUser(id, { first_name, last_name, email, username }) {
    const transaction = await models.sequelize.transaction()

    try {
      let user = await models.Users.findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      let updatedUser = await user.update(
        {
          first_name,
          last_name,
          email,
          username,
        },
        { transaction }
      )

      await transaction.commit()

      return updatedUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      await user.destroy({ transaction })

      await transaction.commit()

      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  async findUserByEmail(email) {
    return await models.Users.findOne({
      where: {
        email,
      },
    })
  }

  // For seeders <-----------
  async findUserByUserName(username) {
    return await models.Users.findOne({
      where: {
        username
      }
    })
  }

  async findUsersByLastName(last_name) {
    return await models.Users.findAll({
      where: {
        last_name
      }
    })
  }
}

module.exports = UsersService

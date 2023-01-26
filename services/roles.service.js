const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

class RolesService {
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

    const roles = await models.Roles.findAndCountAll(options)
    return roles
  }

  async createRol({ name }) {
    const transaction = await models.sequelize.transaction()
    try {
      let newRol = await models.Roles.create(
        {
          name,
        },
        { transaction }
      )

      await transaction.commit()
      return newRol
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getRolOr404(id) {
    let rol = await models.Roles.findByPk(id)

    if (!rol) throw new CustomError('Not found Rol', 404, 'Not Found')

    return rol
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getRol(id) {
    let rol = await models.Roles.findByPk(id, { raw: true })
    return rol
  }

  async updateRol(id, { name }) {
    const transaction = await models.sequelize.transaction()
    try {
      let rol = await models.Roles.findByPk(id)

      if (!rol) throw new CustomError('Not found rol', 404, 'Not Found')

      let updatedRol = await rol.update(
        {
          name,
        },
        { transaction }
      )

      await transaction.commit()

      return updatedRol
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeRol(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let rol = await models.Roles.findByPk(id)

      if (!rol) throw new CustomError('Not found rol', 404, 'Not Found')

      await rol.destroy({ transaction })

      await transaction.commit()

      return rol
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  // For seeders <------------
  async findRoleByName(name) {
    return await models.Roles.findOne({
      where: {
        name
      }
    })
  }
}

module.exports = RolesService

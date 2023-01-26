const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

const rolesServices = require('../services/roles.service')
const rolesService = new rolesServices()

class ProfilesService {
  constructor() {}

  async findAndCount(query) {
    const options = {
      where: {},
      attributes: {
        exclude: ['updated_at', 'created_at', 'profile_id'],
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

    const profiles = await models.Profiles.findAndCountAll(options)
    return profiles
  }

  async createProfile({
    user_id,
    role_id,
    image_url,
    code_phone,
    phone,
    country_id,
  }) {
    const transaction = await models.sequelize.transaction()
    try {
      let newProfile = await models.Profiles.create(
        {
          user_id,
          role_id,
          image_url,
          code_phone,
          phone,
          country_id,
        },
        { transaction }
      )

      await transaction.commit()
      return newProfile
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getProfileOr404(id) {
    let profile = await models.Profiles.findByPk(id)

    if (!profile) throw new CustomError('Not found Profile', 404, 'Not Found')

    return profile
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getProfile(id) {
    let profile = await models.Profiles.findByPk(id, { raw: true })
    return profile
  }

  async updateProfile(
    id,
    { user_id, role_id, image_url, code_phone, phone, country_id }
  ) {
    const transaction = await models.sequelize.transaction()
    try {
      let profile = await models.Profiles.findByPk(id)

      if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')

      let updatedProfile = await profile.update(
        {
          user_id,
          role_id,
          image_url,
          code_phone,
          phone,
          country_id,
        },
        { transaction }
      )

      await transaction.commit()

      return updatedProfile
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeProfile(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let profile = await models.Profiles.findByPk(id)

      if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')

      await profile.destroy({ transaction })

      await transaction.commit()

      return profile
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  // For middlewares <---------
  async verifyAdmin(user_id) {
    try {
      const profiles = await models.Profiles.findAll({
        where: {
          user_id
        }
      })
      
      const admin = await rolesService.findRoleByName('admin')
      
      for (let profile of profiles) {
        if (admin.id === profile.role_id) {
          return true
        }
      }
    
      return false
  
    } catch (error) {
      console.log(error)
      return false
    }
  
  }
}

module.exports = ProfilesService

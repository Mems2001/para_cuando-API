'use strict'
const uuid = require('uuid')
const countriesServices = require('../../services/countries.service')
const rolesServices = require('../../services/roles.service')
const countriesService = new countriesServices()
const rolesService = new rolesServices()
const usersServices = require('../../services/users.service')
const usersService = new usersServices()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const rolePublic = await rolesService.findRoleByName('public')
    const country = await countriesService.findCountryByName('Ecuador')
    const users = await usersService.findUsersByLastName('example')
    const users_ids = []
    const profiles = []

    try {
      for (let user of users) {
        const user_id = await user.dataValues.id
        // console.log(user)
        // console.log(user_id)
        users_ids.push(user_id)
      }
      // console.log(users_ids)
  
      for (let user_id of users_ids) {
        const profile = {
          id: uuid.v4() ,
          user_id,
          role_id: rolePublic.id,
          phone: 999999999 - users_ids.indexOf(user_id),
          country_id: country.id  
        }
        profiles.push(profile)
      }

      await queryInterface.bulkInsert('profiles' , profiles , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

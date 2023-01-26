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
    
    try {
      const admin = await usersService.findUserByUserName('mems2001')
      const admin2 = await usersService.findUserByUserName('pendingAdmin1')
      const admin3 = await usersService.findUserByUserName('pendingAdmin2')
      const admin4 = await usersService.findUserByUserName('pendingAdmin3')
      const admin5 = await usersService.findUserByUserName('pendingAdmin4')
      const country = await countriesService.findCountryByName('Ecuador')
      // console.log(country)
      const roleAdmin = await rolesService.findRoleByName('admin')
      const rolePublic = await rolesService.findRoleByName('public')
      const profiles = [
        {
          id: uuid.v4() ,
          user_id: admin.id ,
          role_id: roleAdmin.id ,
          // phone: 999196035 ,
          country_id: country.id
        } ,
        {
          id: uuid.v4() , // Waitin for Ángel <---------
          user_id: admin2.id ,
          role_id: roleAdmin.id ,
          // phone: 999196036 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() , // Waitin for Josué <---------
          user_id: admin3.id ,
          role_id: roleAdmin.id ,
          // phone: 999196037 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() , // Waitin for Nico <---------
          user_id: admin4.id ,
          role_id: roleAdmin.id ,
          // phone: 999196038 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() , // Waitin for Alexis <---------
          user_id: admin5.id ,
          role_id: roleAdmin.id ,
          // phone: 999196039 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() ,
          user_id: admin.id ,
          role_id: rolePublic.id ,
          phone: 999196035 ,
          country_id: country.id
        } ,
        {
          id: uuid.v4() , // Waitin for Ángel <---------
          user_id: admin2.id ,
          role_id: rolePublic.id ,
          phone: 999196036 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() , // Waitin for Josué <---------
          user_id: admin3.id ,
          role_id: rolePublic.id ,
          phone: 999196037 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() , // Waitin for Nico <---------
          user_id: admin4.id ,
          role_id: rolePublic.id ,
          phone: 999196038 ,
          country_id: country.id 
        } ,
        {
          id: uuid.v4() , // Waitin for Alexis <---------
          user_id: admin5.id ,
          role_id: rolePublic.id ,
          phone: 999196039 ,
          country_id: country.id 
        } 
      ]
      
      await queryInterface.bulkInsert('profiles', profiles , {transaction})

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

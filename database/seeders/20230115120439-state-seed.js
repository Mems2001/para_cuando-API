'use strict'
const uuid = require('uuid')
const {Op} = require('sequelize')
const countriesServices = require('../../services/countries.service')
const countriesService = new countriesServices()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const country = await countriesService.findCountryByName('Ecuador')
      await queryInterface.bulkInsert('states' , [
        {
          id: uuid.v4() ,
          country_id: country.id ,
          name: 'Pichincha' 
        } ,
        {
          id: uuid.v4() ,
          country_id: country.id ,
          name: 'Azuay' 
        } ,
        {
          id: uuid.v4() ,
          country_id: country.id ,
          name: 'Guayas' 
        }
      ] , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkDelete('states' , {
        name: {
          [Op.or] : ['Pichincha' , 'Azuay' , 'Guayas']
        }
      } , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

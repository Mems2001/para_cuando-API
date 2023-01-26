'use strict'
const uuid = require('uuid')
const {Op} = require('sequelize')
const statesServices = require('../../services/state.service')
const statesService = new statesServices()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const pichincha = await statesService.findStateByName('Pichincha')
      const azuay = await statesService.findStateByName('Azuay')
      const guayas = await statesService.findStateByName('Guayas')

      await queryInterface.bulkInsert('cities' , [
        {
          id: uuid.v4() ,
          state_id: pichincha.id,  
          name: 'Quito',
          created_at: new Date() ,
          updated_at: new Date()
        } ,
        {
          id: uuid.v4() ,
          state_id: azuay.id ,
          name: 'Cuenca',
          created_at: new Date() ,
          updated_at: new Date()
        } ,
        {
          id: uuid.v4() ,
          state_id: guayas.id ,
          name: 'Guayaquil',
          created_at: new Date() ,
          updated_at: new Date()
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
      await queryInterface.bulkDelete('cities' , {
        name: {
          [Op.or]: ['Quito' , 'Cuenca' , 'Guayaquil']
        }
      } , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback() 
      throw error
    }
  }
}
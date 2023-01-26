'use strict'
const uuid = require('uuid')
const {Op} = require('sequelize')
const {hashPassword } = require('../../utils/crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const usersSeeds = [
      {
        id: uuid.v4() ,
        first_name: 'Mario' ,
        last_name: 'Muso' ,
        email: 'mems2001code@gmail.com' ,
        username: 'mems2001' ,
        password: hashPassword('root') ,
        email_verified: new Date()
      } ,
      {
        id: uuid.v4() , // Waiting for Ángel <-------------
        first_name: 'Ángel' ,
        last_name: 'Carrasco' ,
        email: 'pending1@gmail.com' ,
        username: 'pendingAdmin1' ,
        password: hashPassword('root') ,
        email_verified: new Date()
      } ,
      {
        id: uuid.v4(), // Waiting for Josué <--------------
        first_name: 'Josué' ,
        last_name: 'Ventura' ,
        email: 'pending2@gmail.com' ,
        username: 'pendingAdmin2' ,
        password: hashPassword('root') ,
        email_verified: new Date()
      },
      {
        id: uuid.v4(), // Waiting for Nicolás <--------------
        first_name: 'Nicolás' ,
        last_name: 'Moyano' ,
        email: 'pending3@gmail.com' ,
        username: 'pendingAdmin3' ,
        password: hashPassword('root') ,
        email_verified: new Date()
      },
      {
        id: uuid.v4(), // Waiting for Alexis <--------------
        first_name: 'Alexis' ,
        last_name: 'X' ,
        email: 'pending4@gmail.com' ,
        username: 'pendingAdmin4' ,
        password: hashPassword('root') ,
        email_verified: new Date()
      } 
    ]

    try {
      await queryInterface.bulkInsert('users' , usersSeeds , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const userNames = ['mems2001' , 'pendingAdmin1' , 'pendingAdmin2' , 'pendingAdmin3' , 'pendingAdmin4'] 

    try {
      await queryInterface.bulkDelete('users' , {
        username: {
          [Op.or]: userNames
        }
      } , {transaction})

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

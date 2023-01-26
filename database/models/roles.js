'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Roles.hasMany(models.Profiles, {
        foreignKey: 'role_id',
        // targetKey: 'role_id',
      })
    }
  }
  Roles.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Roles',
      tableName: 'roles',
      underscored: true,
      timestamps: true,
    }
  )
  return Roles
}

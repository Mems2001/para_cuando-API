'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class States extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      States.belongsTo(models.Countries, { foreignKey: 'country_id' })
      States.hasMany(models.Cities, { foreignKey: 'city_id' })
    }
  }
  States.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      country_id: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'countries',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    },
    {
      sequelize,
      modelName: 'States',
      tableName: 'states',
      underscored: true,
      timestamps: true,
    }
  )
  return States
}

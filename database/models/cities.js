'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cities.hasMany(models.Publications, {
        foreignKey: 'city_id',
        // targetKey: 'city_id',
      })

      Cities.belongsTo(models.States, {
        foreignKey: 'state_id',
        // targetKey: 'city_id',
      })
    }
  }
  Cities.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      state_id: {
        type: DataTypes.UUID,
        foreignKey: true,
        references: {
          model: 'states',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: 'Cities',
      tableName: 'cities',
      underscored: true,
      timestamps: true,
    }
  )
  return Cities
}

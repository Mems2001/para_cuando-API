'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Publications_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications_types.hasMany(models.Publications, {
        foreignKey: 'publication_type_id',
        // targetKey: 'publication_type_id',
      })
    }
  }
  Publications_types.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Publications_types',
      tableName: 'publications_types',
      underscored: true,
      timestamps: true,
    }
  )
  return Publications_types
}

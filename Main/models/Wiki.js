const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Wiki extends Model {}

Wiki.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    wiki_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'wiki',
  }
);

module.exports = Wiki;
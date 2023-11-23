const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  price: DataTypes.FLOAT,
});

module.exports = Item;

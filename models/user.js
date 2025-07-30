const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const User = sequelize.define('User', {
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
   city: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // registerTime:{
  //   type: DataTypes.DATE,
  //   defaultValue: DataTypes.NOW
  // },
  
}, {
  tableName: 'bullcfdUser',
  timestamps: true  // Set to false if your DB doesn't have createdAt/updatedAt
});

module.exports = User;

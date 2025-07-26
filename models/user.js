const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // import sequelize instance

const User = sequelize.define('User', {
  id: {
     type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
   city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  tableName: 'users',
  timestamps: false  // ✅ Set to false if your DB doesn't have createdAt/updatedAt
});

module.exports = User;

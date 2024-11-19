const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Notification = sequelize.define('Notification', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'notifications',
  timestamps: false,
});
Notification.sync()
    .then(() => {
        console.log('Notification table created successfully');
    })
    .catch((error) => {
        console.error('Error creating Users table:', error);
    });

module.exports = Notification;

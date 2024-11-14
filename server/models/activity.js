const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Activity = sequelize.define('Activity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ward: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  likesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'Activity',
  timestamps: true,
});

Activity.sync()
    .then(() => {
        console.log('Activity table created successfully');
    })
    .catch((error) => {
        console.error('Error creating Users table:', error);
    });

module.exports = Activity;

const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const PingMe = sequelize.define('PingMe', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
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
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true, 
},
}, {
  tableName: 'pingMe',  
});

PingMe.sync()
    .then(() => {
        console.log('PingMe table created successfully');
    })
    .catch((error) => {
        console.error('Error creating Users table:', error);
    });

module.exports = PingMe;

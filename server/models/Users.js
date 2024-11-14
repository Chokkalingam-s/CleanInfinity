const { DataTypes } = require('sequelize');
const sequelize = require('./db'); 
const Users = sequelize.define('Users', {
    // User details filled during registration
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ward: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Future details with default values
    mappedMobileNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nfcDId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nfcNDId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    credits: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    nfcDPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    nfcNDPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'Users', 
    timestamps: true 
});
Users.sync()
    .then(() => {
        console.log('Users table created successfully');
    })
    .catch((error) => {
        console.error('Error creating Users table:', error);
    });

module.exports = Users;

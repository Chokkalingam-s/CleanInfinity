const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:MkNrDoEhNglXspoUVaCTvJkTyrtqarKP@junction.proxy.rlwy.net:26168/railway', {
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 70000, 
  },
});

sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.log('Error connecting to the database:', err));

module.exports = sequelize;

// const { Sequelize } = require('sequelize');
// const dbConfig = require('../config/db.config');

// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password,
//   {
//     host: dbConfig.host,
//     dialect: dbConfig.dialect,
//     port: dbConfig.port,
//     dialectOptions: {
//       connectTimeout: 70000, 
//     },
//   }
// );

// sequelize.authenticate()
//   .then(() => console.log('Database connected successfully.'))
//   .catch(err => console.log('Error connecting to the database:', err));

// module.exports = sequelize;

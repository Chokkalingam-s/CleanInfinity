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

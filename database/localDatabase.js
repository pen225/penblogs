const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('blogs', 'postgres', 'jean1235', {
  host: 'localhost',
  dialect: 'postgres'
});


module.exports = sequelize;
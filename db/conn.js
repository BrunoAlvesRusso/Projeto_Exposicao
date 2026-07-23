const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('exposicao', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
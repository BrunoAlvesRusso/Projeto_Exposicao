const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('exposicao', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307
});

try {
  sequelize.authenticate();
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
} catch (error) {
  console.error('Erro ao conectar com o banco de dados:', error);
}

module.exports = sequelize;
const {  DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User');

const Pensamento = db.define('Pensamento', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  }
});

Pensamento.belongsTo(User);
User.hasMany(Pensamento);

module.exports = Pensamento;
const {  DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User');

const Pensamento = db.define('Pensamento', {
  title: {
    type: DataTypes.STRING,
    require: true
  }
});

Pensamento.belongsTo(User);
User.hasMany(Pensamento);

module.exports = Pensamento;
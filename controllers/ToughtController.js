const Tought = require('../models/Pensamento');
const User = require('../models/User');

module.exports = class ToughtController {
  static showToughts(req, res) {
    res.render('../views/toughts/home');
  }
}
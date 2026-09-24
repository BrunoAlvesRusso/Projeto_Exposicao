const Tought = require('../models/Pensamento');
const User = require('../models/User');

module.exports = class ToughtController {
  static showToughts(req, res) {
    res.render('../views/toughts/home');
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;
    User.hasMany(Tought);
    Tought.belongsTo(User);

    req.flash('message', 'Pensamento criado com sucesso! '+Tought);
    const user = await User.findOne({ 
      where: { 
        id: userId 
      },
      include: Tought,
    });

    if (!user) {
      res.redirect('/login');
      return;
    }

    const toughts = user.Toughts.map((result) => result.dataValues);

    console.log('Pensamentos do usuário: ', toughts);

    res.render('../views/toughts/dashboard');
  }

  static createTought(req, res) {
    res.render('../views/toughts/create');
  }

  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid
    };

    try {
      await Tought.create(tought);

      req.flash('message', 'Pensamento criado com sucesso!');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (err) {
      console.log(err);
    }
  }
}
const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email: email } });
    
    // Check if user exists
    if (!user) {
      req.flash('message', 'Usuário não encontrado');
      res.render('auth/login');
      return;
    }

    // Check if password is correct
    const isMatch = await bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      req.flash('message', 'Senha incorreta');
      res.render('auth/login');
      return;
    }

    // Initialize session
    req.session.userid = user.id;

    req.flash('message', 'Usuário logado com sucesso');

    req.session.save(() => {
      res.redirect('/');
    });
  }

  static register(req, res) {
    res.render('auth/register');
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // Check if passwords match
    if (password !== confirmpassword) {
      req.flash('message', 'Senha não corresponde à confirmação de senha');
      res.render('auth/register');

      return;
    }

    // Check if user already exists
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      req.flash('message', 'O e-mail já está em uso');
      res.render('auth/register');

      return;
    }

    // Create a password
    const salt = await bcrypt.genSaltSync(10);

    // Hash the password
    const hashedPassword = await bcrypt.hashSync(password, salt);

    // Create a new user
    const user = {
      name,
      email,
      password: hashedPassword
    };

    // Save the user to the database
    try {
      const createdUser = await User.create(user);

      // Initialize session
      req.session.userid = createdUser.id;

      req.flash('message', 'Usuário criado com sucesso');

      req.session.save(() => {
        res.redirect('/');
      });

      res.redirect('/');
    } catch (error) {
      console.log(error);
      req.flash('message', 'Erro ao criar usuário: '+error);
      res.render('auth/register');
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
}
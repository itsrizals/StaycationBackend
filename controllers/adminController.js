const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      if (req.session.user == null || req.session.user == undefined) {
        res.render('index', {
          title: 'Staycation | Login',
          alert,
        });
      } else {
        res.redirect('/admin/dashboard');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/signin');
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        req.flash('alertMessage', 'User not found!');
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/signin');
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash('alertMessage', 'Wrong password!');
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/signin');
      }

      req.session.user = {
        id: user.id,
        username: user.username,
      };

      res.redirect('/admin/dashboard');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/signin');
    }
  },

  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect('/admin/signin');
  },

  viewDashboard: (req, res) => {
    try {
      res.render('admin/dashboard/view_dashboard', {
        title: 'Staycation | Dashboard',
        user: req.session.user,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/signin');
    }
  },
};

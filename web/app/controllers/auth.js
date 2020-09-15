const express = require('express');
const expressSession = require('express-session');

const mongoose = require('mongoose');
var GitLabStrategy = require('passport-gitlab2').Strategy;
const passport = require('passport');

module.exports = (app) => {
  const router = express.Router();

  //router.get('/auth/gitlab', passport.authenticate('gitlab'));
  router.get(['/auth/gitlab', '/login'], passport.authenticate('gitlab', {
    failureRedirect: '/auth/gitlab-error-temp',
    failureFlash: true
  }))

  router.get(
    '/auth/gitlab/callback',
    passport.authenticate('gitlab', {
      failureRedirect: '/auth/gitlab-error-temp',
      failureFlash: true
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      //res.redirect('/?auth=ok');
      console.log(">>>>>>>>>>> AUTH OK")
      console.log(req.session.bounceTo)
      var tmp = req.session.bounceTo;
      delete req.session.bounceTo;
      res.redirect(tmp);
    }
  );

  router.get(['/logout', '/logoff', '/exit', '/quit'], function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.use('/', router);
}
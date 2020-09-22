const express = require('express');
const expressSession = require('express-session');

const mongoose = require('mongoose');
const Dojos = mongoose.model('Dojos');
var bodyParser = require('body-parser');
var types = ["dojo", "workshop/presentation", "event", "other"]
var publics = ["trainee", "advanced", "both"]
var GitLabStrategy = require('passport-gitlab2').Strategy;
const passport = require('passport');

module.exports = (app) => {

  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed.  Otherwise, the user will be redirected to the
  //   login page.
  function ensureAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
      return next();
    }
    if (!req.session.bounceTo) { // already have a bounce destination
      req.session.bounceTo = req.header('Referer') || '/';
    }
    res.redirect('/auth/gitlab')
  }



  const router = express.Router();

  router.post(
    '/post-dojo',
    ensureAuthenticated,
    bodyParser.urlencoded(), (req, res, next) => {
      console.log(req.body.title);
      console.log(req.body.description);
      console.log(req.body._id);


      if (req.body.hiddenId != '') {
        req.body.edit_date = Date.now()
        req.body.gitlab_username = req.session.passport.user.gitlab_username
        Dojos.update({
          _id: req.body.hiddenId
        }, req.body, {
          upsert: true
        }, function (error, docs) {
          if (error) {
            next(error)
          } else {
            console.log(docs);
            res.redirect('/edit/' + req.body.hiddenId);
          }
        })
      } else {
        req.body.create_date = req.body.edit_date = Date.now()
        req.body.gitlab_username = req.session.passport.user.gitlab_username
        Dojos.insertMany(req.body, function (error, docs) {
          if (error) {
            next(error)
          } else {
            console.log(docs);
            res.redirect('/edit/' + docs[0]._id);
          }
        })
      }
    });

  router.get(['/submit', '/edit/:id'],
    ensureAuthenticated,
    (req, res, next) => {
      logg = () => {
        if (typeof (req.session.passport) != 'undefined') {
          return req.session.passport.user.gitlab_username
        } else {
          return false
        }
      }
      if (typeof (req.params.id) != 'undefined') {
        Dojos.findById(req.params.id, (err, docs) => {
          console.log(docs)
          res.render('submit', {
            title: 'edit Topics@dojo',
            item: docs,
            publics: publics,
            types: types,
            //nickname: req.user.id,
            //uniqueid: req.user.tequila.uniqueid,
            activepage: 'submit',
            username: logg()
          });
        })
      } else {
        res.render('submit', {
          title: 'new Topics@dojo',
          publics: publics,
          types: types,
          activepage: 'submit',
          username: logg()
        });
      }
    });
  app.use('/', router);
}
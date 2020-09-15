const express = require('express')
const expressSession = require('express-session')
const moment = require('moment')
const mongoose = require('mongoose')
const Dojos = mongoose.model('Dojos')
var GitLabStrategy = require('passport-gitlab2').Strategy
const passport = require('passport')

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
    res.redirect('/auth/gitlab') // res.redirect('back');

  }

  const router = express.Router();

  router.get('/voteup/:id',
    ensureAuthenticated,
    (req, res, next) => {
      // TODO:
      // 1- Get the vote list
      console.log("----------------------")
      // console.log(req)
      console.log("----------------------")
      // 2- Check it the user already voted

      // 3a- if yes, redirect with message
      // 3b- if not, add the user's vote
      if (typeof (req.params.id) != 'undefined') {
        Dojos.findById(req.params.id, (err, docs) => {
          console.log(docs)
          docs.votes.push({
            vote_date: moment().toISOString(),
            gitlab_id: req.session.passport.user.gitlab_username
          })
          Dojos.update({
            _id: req.params.id
          }, docs, {
            upsert: true
          }, function (error, docs) {
            if (error) {
              next(error)
            } else {
              console.log(docs);
              res.redirect('/details/' + req.params.id);
            }
          })
        })
      }
    });
  app.use('/', router);
}
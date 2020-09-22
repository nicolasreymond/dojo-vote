const express = require('express');
const mongoose = require('mongoose');
const Dojos = mongoose.model('Dojos');
const User = mongoose.model('User');

module.exports = (app) => {
  const router = express.Router();
  var items = [];

  const queryAllDojos = () => {
    Dojos.find({}, (err, dojos) => {
      if (err) {
        next(err)
      } else {
        dojos.map(dojo => {
          console.log(dojo);
          items.push(dojo);
        })
      }
    })
  }

  // https://stackoverflow.com/a/48820849/960623
  router.get('/newest', (req, res, next) => {

    req.url = '/list';

    // below is the code to handle the "forward".
    // if we want to change the method: req.method = 'POST'
    return app._router.handle(req, res, next);
  });

  router.get(['/', '/list'], (req, res, next) => {

    console.log(">>>>>>>>>>>SESSION >>>>>>>>>>>>>>>>")
    console.log(req.session)



    items = [];
    Dojos.find({}, (err, docs) => {
      if (err) {
        console.log(err)
      } else {

        console.log(docs)
        res.render('list', {
          title: 'Topics@dojo',
          items: docs,
          activepage: 'newest'
        });
      }
    }).sort('-date')

  });

  router.get(['/newcomments'], (req, res, next) => {
    Dojos.find({}, (err, docs) => {
      debugger;
      res.render('list-comments', {
        title: 'Topics@dojo',
        items: docs.sort((a, b) => (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? 1 : 0)),
        activepage: 'newcomments',
        // username: req.session.passport.user.gitlab_username || false
      });

    })
  });

  router.get(['/points'], (req, res, next) => {
    logg = () => {
      if (typeof (req.session.passport) != 'undefined') {
        return req.session.passport.user.gitlab_username
      } else {
        return false
      }
    }
    Dojos.find({}, (err, docs) => {
      if (err) {
        console.log(err)
      } else {
        res.render('list', {
          title: 'Topics@dojo',
          items: docs,
          activepage: 'points',
          // username: req.session.passport.user.gitlab_username || false
          username: logg()
        });
      }
    }).sort('votes')
    // https://docs.mongodb.com/manual/reference/operator/aggregation/size/
  });

  router.get(['/details', '/details/:id'], (req, res, next) => {
    Dojos.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        res.render('details', {
          title: 'details Topics@dojo',
          item: doc,
          activepage: 'details'
          //username: logg()
        });
      }
    })
  });



  app.use('/', router);
};
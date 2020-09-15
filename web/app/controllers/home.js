const express = require('express');
const mongoose = require('mongoose');
const Dojos = mongoose.model('Dojos');

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
    var items = [{
        title: "zar zar zar zar zar zar zar zar zar zar",
        id: 4,
        points: 808,
        comments: 808,
        datetime: '2018-10-04 13:37:00',
        nickname: 'Boastdoric'
      },
      {
        title: "zar zar zar zar zar zar zar zar zar zar",
        id: 14,
        points: 25,
        comments: 25,
        datetime: '2018-10-14 13:37:00',
        nickname: 'stoic_einstein'
      },
      {
        title: "zar zar zar zar zar zar zar zar zar zar",
        id: 9,
        points: 19,
        comments: 19,
        datetime: '2018-10-09 13:37:00',
        nickname: 'khayyam'
      },
      {
        title: "far far far far far far far far far far",
        id: 15,
        points: 55,
        comments: 55,
        datetime: '2018-10-15 13:37:00',
        nickname: 'thelgnd27'
      },
      {
        title: "far far far far far far far far far far",
        id: 5,
        points: 5,
        comments: 5,
        datetime: '2018-10-05 13:37:00',
        nickname: 'myrel'
      },
      {
        title: "foo foo foo foo foo foo foo foo foo foo",
        id: 6,
        points: 16,
        comments: 16,
        datetime: '2018-10-06 13:37:00',
        nickname: 'KathleenBooth'
      },
      {
        title: "foo foo foo foo foo foo foo foo foo foo",
        id: 1,
        points: 13,
        comments: 13,
        datetime: '2018-10-01 13:37:00',
        nickname: 'Fayther'
      },
      {
        title: "foo foo foo foo foo foo foo foo foo foo",
        id: 11,
        points: 21,
        comments: 21,
        datetime: '2018-10-11 13:37:00',
        nickname: 'wescoff'
      },
      {
        title: "baz baz baz baz baz baz baz baz baz baz",
        id: 3,
        points: 42,
        comments: 42,
        datetime: '2018-10-03 13:37:00',
        nickname: 'Azog'
      },
      {
        title: "baz baz baz baz baz baz baz baz baz baz",
        id: 8,
        points: 18,
        comments: 18,
        datetime: '2018-10-08 13:37:00',
        nickname: 'elgamal'
      },
      {
        title: "baz baz baz baz baz baz baz baz baz baz",
        id: 13,
        points: 23,
        comments: 23,
        datetime: '2018-10-13 13:37:00',
        nickname: 'mooore'
      },
      {
        title: "bar bar bar bar bar bar bar bar bar bar",
        id: 2,
        points: 37,
        comments: 37,
        datetime: '2018-10-02 13:37:00',
        nickname: 'r4ldosse'
      },
      {
        title: "bar bar bar bar bar bar bar bar bar bar",
        id: 7,
        points: 17,
        comments: 17,
        datetime: '2018-10-07 13:37:00',
        nickname: 'brahmagupta'
      },
      {
        title: "far far far far far far far far far far",
        id: 10,
        points: 20,
        comments: 20,
        datetime: '2018-10-10 13:37:00',
        nickname: 'wilson'
      },
      {
        title: "bar bar bar bar bar bar bar bar bar bar",
        id: 12,
        points: 22,
        comments: 22,
        datetime: '2018-10-12 13:37:00',
        nickname: 'sanderson'
      },
    ];
    res.render('list-comments', {
      title: 'Topics@dojo',
      items: items,
      activepage: 'newcomments',
      username: req.session.passport.user.gitlab_username || false
    });
  });

  router.get(['/points'], (req, res, next) => {
    Dojos.find({}, (err, docs) => {
      if (err) {
        console.log(err)
      } else {
        res.render('list', {
          title: 'Topics@dojo',
          items: docs,
          activepage: 'points',
          //username: req.session.passport.user.gitlab_username || false
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
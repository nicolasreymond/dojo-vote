const express = require('express');
const glob = require('glob');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');
const expressSession = require('express-session');
  const router = express.Router();
  
const mongoose = require('mongoose');
const User = mongoose.model('User');

const passport = require('passport');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitLabs profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


var  GITLAB_CLIENT_ID = "47ed68bcf2541f8dd9e2d19ec6a25df21fd003eab76d09aaa196122a22517b54"
var  GITLAB_CLIENT_SECRET = "552bd826d0321219d2e0a5d6cd1192aed6f6dc937270889919dc32f8f5287c7a";

// Use the GitLabStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and GitLab profile),
//   and invoke a callback with a user object.
var GitLabStrategy = require('passport-gitlab2').Strategy;
passport.use( new GitLabStrategy({
    clientID: GITLAB_CLIENT_ID,
    clientSecret: GITLAB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/gitlab/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    
    User.findOrCreate(
      { 
        gitlab_id: profile.id,
        gitlab_username: profile.username,
        gitlab_name: profile.displayName,
        gitlab_emails: profile.emails,
        gitlab_avatar_url: profile.avatarUrl
      }, function (err, user) {
        return done(err, user);
      }
    );
  }
));

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'nunjucks');
  var nenv = nunjucks.configure(config.root + '/app/views', {
    autoescape: true,
    express: app
  });
  // https://github.com/e-picas/nunjucks-date-filter
  var dateFilter = require('nunjucks-date-filter');
  nenv.addFilter('date', dateFilter);
  
  app.use(favicon(config.root + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  app.use(expressSession({
    secret: 'sldkvkdjjlskdfskfj asdf sdfsddf',
    resave: false,
    ttl: (1 * 60 * 60),
    saveUninitialized: false
  }));
  
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  //app.tequilaStrategy = TequilaStrategy;

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  // https://gist.github.com/therealplato/7997908
  // If a user visits an auth page and we don't have .bounceTo in session,
  // set it to: query['bounce']  ||  req.header('Referer')  ||  '/'
  
  // ToDo: moar test → this is not full proof (e.g. if you click the edit link
  // for a dojo, it does not redirect)
  router.get('/auth/*', function(req, res, next){
    if(!!req.session.bounceTo){ // already have a bounce destination
      return next();
    } else {
      if(req.query['bounce']){
        req.session.bounceTo = req.query['bounce'];
      } else {  // no explicit destination, use referer or homepage
        req.session.bounceTo=req.header('Referer') || '/';  
      }
      return next();
    };
  });
  
  return app;
};

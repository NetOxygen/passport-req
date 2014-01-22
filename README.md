# passport-req

[Passport](http://passportjs.org/) strategy for authenticating without an
opinion of how you want to do it.

This module lets you authenticate in your Node.js applications. By plugging
into Passport, local authentication can be easily and unobtrusively integrated
into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-req

## Usage

#### Configure Strategy

The req authentication strategy authenticates users requires a `verify`
callback, which calls `done` providing a user.

    passport.use(new ReqStrategy(
      function(req, done) {
        User.findOne({ username: req.query.username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.verifyPassword(req.query.password)) { return done(null, false); }
          return done(null, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'req'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.post('/login',
      passport.authenticate('req', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });

## Credits

  - [Jared Hanson](http://github.com/jaredhanson) wrote
    [passport-local](https://github.com/jaredhanson/passport-local)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
Copyright (c) 2014 Alexandre Perrin <[https://kaworu.ch/](https://kaworu.ch/)>

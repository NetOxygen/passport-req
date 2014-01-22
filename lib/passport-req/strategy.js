/**
 * Module dependencies.
 */
var passport = require('passport');
var util     = require('util');


/**
 * `Strategy` constructor.
 *
 * The req authentication strategy completely delegate authentication logic to
 * the application.
 *
 * Applications must supply a `verify` callback accepting a `req` argument and
 * then calls the `done` callback supplying a `user`, which should be set to
 * `false` if the credentials are not valid. If an exception occured, `err`
 * should be set.
 *
 * Examples:
 *
 *     passport.use(new ReqStrategy(
 *       function(req, done) {
 *         User.findOne({
 *           username: req.query.username,
 *           password: req.query.password
 *         }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Function} verify
 * @api public
 */
function Strategy(verify) {
    if (!verify)
        throw new Error('local authentication strategy requires a verify function');
    passport.Strategy.call(this);
    this.name = 'req';
    this._verify = verify;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req) {
    var self = this;
    this._verify(req, function verified(err, user, info) {
        if (err)
            return self.error(err);
        if (!user)
            return self.fail(info);
        self.success(user, info);
    });
}


/**
 * Expose `Strategy`.
 */ 
module.exports = Strategy;

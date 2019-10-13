const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        async (username, password, done) => {
            // try {
            const user = await User.findOne({ username });

            debugger;

            if (user) {
                console.log('username already taken');
                return done(null, false, { message: 'username already taken' });
            } else {
                const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

                const user = new User({ username, password: hashedPassword });

                try {
                    await user.save();

                    return done(null, user);
                } catch(err) {
                    done(err);
                }
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: false,
    },
    async (username, password, done) => {

            const user = await User.findOne({ username });

            if (!user) {
                return done(null, false, { message: 'bad username' });
            } else {
                const response = await bcrypt.compare(password, user.password);

                debugger;

                if (!response) {
                    console.log('passwords do not match');
                    return done(null, false, { message: 'passwords do not match' });
                }
                console.log('user found and authenticated');
                return done(null, user);
            }
        }
    ),
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
};

passport.use(
    'jwt',
    new JWTStrategy(opts, 
        async (jwt_payload, done) => {

            const user = await User.findOne({ username: jwt_payload.id });

            if (user) {
                console.log('user found in db in passport');
                done(null, user);
            } else {
                console.log('user not found in db');
                done(null, false);
            }
        // try {

        // }
    })
);
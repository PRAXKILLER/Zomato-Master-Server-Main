import e from 'cors';
import passport from 'passport';
import JwtPassport from 'passport-jwt'

// Database Model
import { UserModel } from '../database/allModels'

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ZomatoApp"
}

export default (passport) => {
    passport.use(
        new JWTStrategy(options, async(jwt__payload, done) => {
            try {
                const doesUserExists = await UserModel.findById(jwt__payload.user);
                if (!doesUserExists) {
                    return done(null, false);
                }

                return done(null, doesUserExists);
            } catch (error) {
                throw new Error(error);
            }
        })
    )
}
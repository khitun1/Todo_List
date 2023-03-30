const {User} = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const winston = require("../winston");
const apiError = require("../error/apiError");

const generateJwt = (id, name, surname, login, password) => {
    return jwt.sign({
            id,
            name,
            surname,
            login,
            password
    },
        process.env.SECRET_KEY,
        {
            expiresIn: '24h'
        })
}

class UserController {
    async login(req, res, next) {
        try {
            const {login, password} = req.body;
            const user = await User.findOne({
                where: {
                    login
                }
            })
            if (!user) {
                return res.send('Incorrect login');
            }
            const comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.send('Incorrect password');
            }
            const token = generateJwt(user.id, user.name, user.surname, user.login, password);
            return res.json({token});
        } catch (e) {

        } finally {

        }
    }

    async signUp(req, res, next) {
        try {
            const {name, surname, login, password} = req.body;
            const overlap = await User.findOne({
                where: {
                    login
                }
            })
            if (overlap) {
                return res.send('User with this login already exists');
            }
            const hash = await bcrypt.hash(password, 5);
            const user = await User.create({name, surname, login, password: hash});
            const token = generateJwt(user.id, name, surname, login, password);
            return res.json({token});
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        }
    }

    async auth(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.user.id,
                }
            })
            const token = generateJwt(user.id, user.name, user.surname, user.login, req.user.password);
            return res.json({token})
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        }
    }

    async changeLogin(req, res, next) {
        try {

            const login = req.body.login;
            const user = await User.findOne({
                where: {
                    login,
                }
            })
            if (user) {
                return res.send('User with this login already exists');
            }
            await User.update({login: login}, {
                where: {
                    id: req.user.id
                }
            })
            const token = generateJwt(req.user.id, req.user.name, req.user.surname, login, req.user.password);
            return res.json({token});
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        }
    }

    async changePassword(req, res, next) {
        try {
            const password = req.body.password;
            const hash = await bcrypt.hash(password, 5);
            await User.update({password: hash}, {
                where: {
                    id: req.user.id
                }
            })
            const token = generateJwt(req.user.id, req.user.name, req.user.surname, req.user.login, password);
            return res.json({token});
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        }
    }
}

module.exports = new UserController();
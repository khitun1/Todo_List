const {Task} = require("../models");
const winston = require('../winston');
const apiError = require("../error/apiError");

class TodoController {
    async getTodo(req, res, next) {
        try {
            const tasks = await Task.findAll({
                where: {
                    userId: req.user.id
                }
            })
            return res.send(tasks)
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        }
    }

    async createTodo(req, res, next) {
        try {
            const {title, body} = req.body;
            await Task.create({title, body, userId: req.user.id});
            return res.send('Created');
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        }
    }

    async deleteTodo(req, res, next) {
        try {
            await Task.destroy({
                where: {
                    id: req.body.id
                }
            })
            return res.send('deleted!');
        } catch (e) {
            winston.error(e.message);
            return next(apiError.internal(e.message));
        }
    }
}

module.exports = new TodoController()
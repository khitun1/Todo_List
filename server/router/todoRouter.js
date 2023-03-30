const Router = require('express')
const router = new Router();
const TodoController = require('../controllers/todoController')
const authMiddleware = require('../middleware/authMiddleware');

router.get('/get', authMiddleware, TodoController.getTodo);
router.post('/create', authMiddleware, TodoController.createTodo);
router.post('/delete', authMiddleware, TodoController.deleteTodo);

module.exports = router;
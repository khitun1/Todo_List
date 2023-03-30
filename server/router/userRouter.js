const Router = require('express')
const router = new Router();
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', UserController.login);
router.post('/signUp', UserController.signUp);
router.post('/changeLogin', authMiddleware, UserController.changeLogin);
router.post('/changePaswword', authMiddleware, UserController.changePassword);
router.get('/auth', authMiddleware,  UserController.auth);

module.exports = router;
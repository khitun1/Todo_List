const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).send('Not auth')
        }
        req.user =jwt.verify(token, process.env.SECRET_KEY);
        next()
    } catch (e) {
        
    }
}
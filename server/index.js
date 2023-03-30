require('dotenv').config();
const express = require('express')
const cors = require('cors')
const sequelize = require('./db');
const router = require('./router/index');
const errorMiddleware = require('./middleware/errorMiddleware')

const port = process.env.PORT

const app = express();

app.use(cors())
    .use(express.json())
    .use('/api', router)
    .use(errorMiddleware)

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => console.log('Server is working'));
    }
    catch (e) {
        console.log(e)
    }
}

start();
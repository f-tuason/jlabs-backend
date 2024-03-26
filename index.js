const express = require('express');
const cors = require('cors');
const mongoDB = require('./helpers/mongodb');
const JWTHandler = require('./helpers/jwt_handler');
const Auth = require('./auth/authModel');

mongoDB.connect();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ip', async (req, res) => {
    res.json({ msg: Okay })
})

app.post('/login', async (req, res) => {
    res.json({ msg: Okay })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

app.listen(() => {
    console.log(`Open server running at port ${PORT}`);
})

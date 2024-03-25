const express = require('express');
const cors = require('cors');
//const mongoDB = require('./helpers/mongodb');

//mongoDB.connect();

const PORT = 5173;
const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('', () => {
    
// })

// app.get('', () => {
    
// })

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

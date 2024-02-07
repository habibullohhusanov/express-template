import express from 'express';
import connect from './config/dbConfig.js';
import authRoute from './routes/authRoute.js';

// .env data
const URL = process.env.URL;
const PORT = process.env.PORT;

// start
const app = express();

// middlwares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// routes
app.use('/auth', authRoute);
app.use('/', (req, res) => {
    res.status(200).json({
        "success": true,
        "data": [],
        "message": "the template has been run successfully"
    });
});

// end
app.listen(PORT, () => {
    connect();
    console.log(`${URL}:${PORT}`);
})
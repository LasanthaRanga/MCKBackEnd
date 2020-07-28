const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

const allowedOrigins = [
    '*',
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
}

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

const userRouter = require('./routes/users');
const assessRouter = require('./routes/assess');
const atdRouter = require('./routes/atdRout');
const atdUploadsRouter = require('./routes/atdUploads');



app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/user', userRouter);
app.use('/ass', assessRouter);
app.use('/atd', atdRouter);
app.use('/atdUpload', atdUploadsRouter);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    console.log(error.message);
    next(error);
});

app.get('/', cors(corsOptions), (req, res, next) => {
    res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
})


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

app.listen(port);
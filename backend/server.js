const express = require('express');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const apiRoutes = require('./routes/apiRoutes')

app.use(express.json());
app.use(fileupload());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({message: "API running..."})
})

//mongoDB connection
const connectDB = require('./config/db')
connectDB();


app.use('/api', apiRoutes)

app.use((error, req, res, next) => {
    console.error(error);
    next(error);
});

app.use((error,req,res,next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack
    });
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}...`)
})
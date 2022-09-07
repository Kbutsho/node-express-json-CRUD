const { cyan, bold } = require('colorette');
const express = require('express');
const app = express();
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');
const dbConnection = require('./utils/dbConnection');
require('dotenv').config();
const userRouter = require('./routes/user.route');

// dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        'status': true,
        'message': 'Home page',
    });
});
app.all('*', (req, res) => {
    res.status(404).json({
        'status': false,
        'message': 'page not found',
    });
});
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(cyan(bold("Server is running on PORT " + port)));
});
process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});
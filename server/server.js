const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

//App
const app = express();

//DB
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log('DB Error => ', err));

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

//Routes
fs.readdirSync('./routes').map(r =>
    app.use('/api', require('./routes/' + r))
);

//Port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));



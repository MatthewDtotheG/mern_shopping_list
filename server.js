const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');

const app = express();

// BodyParser Middleware

app.use(bodyParser.json());

// DB config

const db = require('./config/keys').mongoURI;

// Connect to mongo

mongoose
.connect(db)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Use routes

app.use('/api/items', items)

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

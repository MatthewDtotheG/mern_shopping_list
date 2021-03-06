const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path');

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

// Serve Static Assets if in production
if(process.env_NODE_ENV === 'production'){
  // Set static folders
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config/config');


// routes
var authRoutes = require('./routes/auth');
var userRoutes = require('./routes/users');

const { MONGO_URI, MONGO_DB_NAME } = config;
console.log("CONFIG", config);
console.log("MONGO", MONGO_URI)
console.log("MONGO_DB_NAME", MONGO_DB_NAME)

const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
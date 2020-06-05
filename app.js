const express = require('express');
const morgan = require('morgan');

// some security middlawerers (because I do this in every Express pp)
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const compression = require('compression');

const routers = require('./src/routers/routers');

const app = express();

// Middleware Stack
//set http secure headers with helmet
app.use(helmet());

// set morgan tu run only in development enviroment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set express.json() middleware in oreder to have access to req.body data. Limit the amount of data caoming in with req.body at only 10kb
app.use(express.json({ limit: '10kb' }));

//protect agians nosql query injection with
app.use(mongoSanitize());

//protect agains xss atacks. don't allow malicious html to be sent in req.body
app.use(xss());

//add compression to middleware stack in order to compress text files
app.use(compression());

//end-points
app.use('/api/v1', routers);

// export the app in order to make it availble in routes files
module.exports = app;

const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const patientRouter = require('./routes/patientRoutes');
const therapistRouter = require('./routes/therapistRoutes');
const waitListRouter = require('./routes/waitListRoutes');
const scheduleListRouter = require('./routes/scheduleListRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Using CORS
app.use(cors());


// Serving static files
app.use(express.static(`${__dirname}/public`));

// 3) ROUTES
app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/therapists', therapistRouter);
app.use('/api/v1/waitlist', waitListRouter);
app.use('/api/v1/scheduledlist', scheduleListRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//app.use(globalErrorHandler);

module.exports = app;

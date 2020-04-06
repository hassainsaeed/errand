// This module updates the express app for this Application to have the correct settings
// and configures all the routes


const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
auth = require('../api/auth'),
runner_events = require('../api/runner_events')
orders = require('../api/orders')


async function expressSetUp(app) {

  // Configure the Heartbeat (status checks) endpoints
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  app.use(require('method-override')());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // LOAD THE API ENDPOINTS

  // 1 - Load the authenticate users route
  app.use("/api/auth", auth)

  // 2 - Load the Runner Events route
  app.use("/api/runner_events", runner_events)

  // 3 - Load the Orders route
  app.use("/api/orders", orders)

  // NOTE: If i want to modularize loading all the routes later down the line, use this:
  //app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {

    // Handle 401 thrown by express-jwt library
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};

module.exports =  expressSetUp

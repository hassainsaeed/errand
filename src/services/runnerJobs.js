const Container = require('typedi').Container;
const { Client, Status } = require('@googlemaps/google-maps-services-js'); // TO DO: Move this to dependencyInjector

const mySqlConnection = Container.get('mySqlConnection');
const logger = Container.get('logger');

const config = require('../config');

const client = new Client({});

function dbCreateNewRunnerJob(newRunnerJobParams) {
  return new Promise(((resolve, reject) => {
    mySqlConnection.query('INSERT INTO runner_jobs SET ? ', newRunnerJobParams, (err, res) => {
      if (err) {
        reject(new Error(`❌ Something went wrong when trying to create the runner job: ${err.message}`));
      } else {
        newRunnerJobParams.id = res.insertId;
        logger.info('✔️  Created runner job ID: ', newRunnerJobParams.id);
        resolve(newRunnerJobParams);
      }
    });
  }));
}


function dbGetActiveRunnerJobs() {
  const status = 'ACTIVE';
  const isAcceptingRequests = true;
  return new Promise(((resolve, reject) => {
    mySqlConnection.query('SELECT * FROM runner_jobs WHERE status = ? AND is_accepting_requests = ?', [status, isAcceptingRequests], (err, res) => {
      if (err) {
        reject(new Error(`❌ Something went wrong when querying for runner job: ${err.message}`));
      } else {
        resolve(res);
      }
    });
  }));
}

// Using Google Maps to calculate distance between runner and reciever:
function isWithinDistanceGoogleMaps(runnerLatitude, runnerLongitude, radius,
  requesterLatitude, requesterLongitude) {
  const radiusInMetres = radius * 1000;
  return new Promise(((resolve, reject) => {
    client
      .distancematrix({
        params: {
          origins: [{ lat: runnerLatitude, lng: runnerLongitude }],
          destinations: [{ lat: requesterLatitude, lng: requesterLongitude }],
          key: config.GOOGLE_MAPS_API_KEY,
          units: 'metric',
        },
        timeout: 1000, // milliseconds
      })
      .then((res) => {
        if (res.data.status === Status.OK && res.data.rows[0].elements[0].status === Status.OK) {
          logger.info(`📍 Google Maps DistanceMatrix between Runner and Receiver: ${res.data.rows[0].elements[0].distance}`);
          const distance = res.data.rows[0].elements[0].distance.value;
          logger.info(`🧮 Distance is ${distance} and radius is ${radiusInMetres}, so isWithinDistance=${distance < radiusInMetres}`);
          if (distance < radiusInMetres) resolve(true);
        } else {
          logger.error(res.data.error_message);
        }
        resolve(false);
      })
      .catch((err) => {
        logger.info(err);
        reject(err);
      });
  }));
}


// function requestRunners(order) {
//   // First grab list of all runners delivering to location of requester
//   // runnersNearBy = getJobsDeliveringToLocation(order.requester_latitude,
// order.requester_longitude)
//   // For each runnerNearBy, send push notification to them for the job
//   // If runner accepts, they will send a PUT request to the orders API
//   // If runner rejects or does not answer in time, order is cancelled
// }


function createJob(userId, runnerLatitude, runnerLongitude, radius, storeName) {
  logger.info(' Creating a new runner job...');
  const today = new Date();
  const newJobInput = {
    runners_user_id: userId,
    status: 'ACTIVE',
    created_at: today.toISOString().slice(0, 19).replace('T', ' '),
    ended_at: null,
    is_accepting_requests: true,
    store_name: storeName,
    runner_latitude: runnerLatitude,
    runner_longitude: runnerLongitude,
    radius: radius,
  };
  return dbCreateNewRunnerJob(newJobInput)
    .then((createdJob) => createdJob)
    .catch((err) => {
      throw err;
    });
}

function getJobs() {
  logger.info('🏃 Getting all active runner jobs ...');
  return dbGetActiveRunnerJobs()
    .then((runnerJobs) => runnerJobs)
    .catch((err) => {
      throw err;
    });
}

function getJobsDeliveringToLocation(requesterLatitude, requesterLongitude) {
  logger.info('🏃 Getting all active runner jobs delivering to this user\'s location...');
  return dbGetActiveRunnerJobs()
    .then(async (results) => {
      const allRunnerJobs = results;
      let i;
      const runnerJobsDeliveringToLocation = [];
      for (i = 0; i < allRunnerJobs.length; i++) {
        await isWithinDistanceGoogleMaps(allRunnerJobs[i].runner_latitude,
          allRunnerJobs[i].runner_longitude, allRunnerJobs[i].radius,
          requesterLatitude, requesterLongitude)
          .then((withinDistance) => {
            if (withinDistance) runnerJobsDeliveringToLocation.push(allRunnerJobs[i]);
          })
          .catch((err) => {
            throw err;
          });
      }
      return runnerJobsDeliveringToLocation;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  createJob: createJob,
  getJobs: getJobs,
  getJobsDeliveringToLocation: getJobsDeliveringToLocation,
};

const mySqlConnection = require('../loaders/mySql');

function dbCreateNewRunnerJob(newRunnerJobParams) {
  return new Promise(((resolve, reject) => {
    mySqlConnection.query('INSERT INTO runner_jobs SET ? ', newRunnerJobParams, (err, res) => {
      if (err) {
        reject(new Error(`❌ Something went wrong when trying to create the runner job: ${err.message}`));
      } else {
        newRunnerJobParams.id = res.insertId;
        console.log('✔️  Created runner job ID: ', newRunnerJobParams.id);
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

// This function calculates the straight line distance (e.g as the crow flies)
// between runner and requester and returns true if distance is less than radius
// Taken from https://www.movable-type.co.uk/scripts/latlong.html
// Note 'as crow flies' is different than driving distance, so we many need to change this
function isWithinDistance(runnerLatitude, runnerLongitude, radius,
  requesterLatitude, requesterLongitude) {
  const earthsRadiusinKm = 6371;
  const deltaLatInRad = ((parseFloat(requesterLatitude) - parseFloat(runnerLatitude))
  * Math.PI) / 180;
  const deltaLongInRad = ((parseFloat(requesterLongitude) - parseFloat(runnerLongitude))
  * Math.PI) / 180;
  const runnerLatInRad = (parseFloat(runnerLatitude) * Math.PI) / 180;
  const requesterLatInRad = (parseFloat(requesterLatitude) * Math.PI) / 180;
  const a = Math.sin(deltaLatInRad / 2) * Math.sin(deltaLatInRad / 2)
        + Math.cos(runnerLatInRad) * Math.cos(requesterLatInRad)
        * Math.sin(deltaLongInRad / 2) * Math.sin(deltaLongInRad / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthsRadiusinKm * c;
  console.log(`Distance is: ${distance}`);
  if (distance < radius) return true;
  return false;
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
  console.log(' Creating a new runner job...');
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
  console.log('🏃 Getting all active runner jobs ...');
  return dbGetActiveRunnerJobs()
    .then((runnerJobs) => runnerJobs)
    .catch((err) => {
      throw err;
    });
}

function getJobsDeliveringToLocation(requesterLatitude, requesterLongitude) {
  console.log('🏃 Getting all active runner jobs delivering to this user\'s location...');
  return dbGetActiveRunnerJobs()
    .then((results) => {
      const allRunnerJobs = results;
      let i;
      const runnerJobsDeliveringToLocation = [];
      for (i = 0; i < allRunnerJobs.length; i++) {
        if (isWithinDistance(allRunnerJobs[i].runner_latitude,
          allRunnerJobs[i].runner_longitude, allRunnerJobs[i].radius,
          requesterLatitude, requesterLongitude)) {
          runnerJobsDeliveringToLocation.push(allRunnerJobs[i]);
        }
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

const mySqlConnection = require('../loaders/mySql');

function dbCreateNewRunnerJob(newJobInput) {
  return new Promise(((resolve, reject) => {
    mySqlConnection.query('INSERT INTO runner_jobs SET ? ', newJobInput, (err, res) => {
      if (err) {
        reject(new Error(`❌ Something went wrong when trying to create the runner job: ${err.message}`));
      } else {
        console.log('✔️  Created runner job ID: ', res.insertId);
        resolve(newJobInput);
      }
    });
  }));
}


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

module.exports = {
  createJob: createJob,
};

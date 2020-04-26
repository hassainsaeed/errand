const mySqlConnection = require('../loaders/mySql');
// const runnerService = require('./runnerJobs');


// function checkIfOrderAccepted(orderID) {
//   //Background job that checks after 1 minute if order changed status.
//   // If yes, kill job
//   // if no, change order status to CANCELLED
// }


function dbGetOrdersByIds(ids) {
  return new Promise((resolve, reject) => {
    mySqlConnection.query('SELECT * FROM orders WHERE id IN (?) ', [ids], (err, res) => {
      if (err) {
        reject(new Error(`❌ Something went wrong when querying for orders: ${err.message}`));
      } else {
        console.log(JSON.stringify(res));
        resolve(res);
      }
    });
  });
}

function dbCreateNewOrder(newOrderParams) {
  return new Promise((resolve, reject) => {
    mySqlConnection.query('INSERT INTO orders SET ? ', newOrderParams, (err, res) => {
      if (err) {
        reject(new Error(`❌ Something went wrong when trying to create the new order: ${err.message}`));
      } else {
        newOrderParams.id = res.insertId;
        console.log('✔️  Created Order ID: ', newOrderParams.id);
        resolve(newOrderParams);
      }
    });
  });
}

function dbUpdateOrderWithRunnerInfo(runnerInfo, orderId) {
  return new Promise((resolve, reject) => {
    mySqlConnection.query('UPDATE orders SET ? WHERE id = ? ', [runnerInfo, orderId], (err, res) => {
      if (err) {
        reject(new Error(`❌ Something went wrong when trying to assign the order to the runner: ${err.message}`));
      } else {
        console.log('✔️  Updated Order ID: ', orderId);
        resolve(orderId);
      }
    });
  });
}


function getOrders(ids) {
  console.log(`🎁 Fetching order IDs of ${ids}`);
  return dbGetOrdersByIds(ids)
    .then((orders) => orders)
    .catch((err) => {
      throw err;
    });
}


function createOrder(requesterUserId, list, requesterLatitude, requesterLongitude) {
  console.log('🎁 Creating a brand new order ...');
  const today = new Date();
  const newOrderInput = {
    requester_user_id: requesterUserId,
    list: list,
    requester_latitude: requesterLatitude,
    requester_longitude: requesterLongitude,
    created_at: today.toISOString().slice(0, 19).replace('T', ' '),
    ended_at: null,
    runner_job_id: null,
    runner_user_id: null,
    status: 'PENDING',
  };

  return dbCreateNewOrder(newOrderInput)
    .then((createdOrder) =>
      // runnerService.requestRunners(createdOrder);
      // checkIfOrderAccepted(createdOrder.id)
      createdOrder)
    .catch((err) => {
      throw err;
    });
}

function assignOrder(runnerUserId, runnerJobId, storeName, orderId) {
  // TO DO: add "Time runner accepted job to the orders"
  // today = new Date() ---> time runner accepted job
  console.log(`🎁🏃 Assigning Runner ${runnerUserId} to Order ${orderId}`);
  const runnerInfo = {
    runner_user_id: runnerUserId,
    runner_job_id: runnerJobId,
    store_name: storeName,
    status: 'IN PROGRESS',
  };

  return dbUpdateOrderWithRunnerInfo(runnerInfo, orderId)
    .then((assignedOrder) => assignedOrder)
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  createOrder: createOrder,
  getOrders: getOrders,
  assignOrder: assignOrder,
};

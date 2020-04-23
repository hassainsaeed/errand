const express = require('express');
const middleware = require('./middleware')
const orders = require('../services/orders')

const router = express.Router();


// GET To get specific order, or list of orders, based on ID
router.get('/', middleware.verifyToken, async (req, res, next) => {
  const ids = req.params.ids;

  try {
    const returnedOrders = await orders.getOrders(ids);
    console.log(`Returning Order with ids: ${ids} `);
    return res.status(200).json({ returnedOrders });
  } catch (err) {
    console.log(`🔥 Error! ${err}`);
    return next(err);
  }
});

// POST to create order. Must HAVE RUNNER JOB ID
router.post('/', middleware.verifyToken, async (req, res, next) => {
  const requesterUserId = req.body.user_id;
  const list = req.body.list;
  const storeName = req.body.storeName;
  const requesterLatitude = req.body.requester_latitude;
  const requesterLongitude = req.body.requester_longitude;

  try {
    const createdOrder = await orders.createOrder(requesterUserId, list, storeName, requesterLatitude, requesterLongitude);
    console.log(`${requesterUserId} just created a new Order`);
    return res.status(201).json({ createdOrder });
  } catch (err) {
    console.log(`🔥 Error! ${err}`);
    return next(err);
  }
});


module.exports = router;


// Flow:
// Runner makes a JOB
// User starts making an order but nothing sent to backend
// User submits an order request
// Gets all the runners returning near them
// Send push notifixation to the runners delivering near them
// Runner can accept the order request
// Order is created
// Runner can view order any time

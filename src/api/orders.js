const express = require('express');
const Container = require('typedi').Container;

const logger = Container.get('logger');
const middleware = require('./middleware');
const ordersService = require('../services/orders');


const router = express.Router();


// GET To get specific order, or list of orders, based on ID
router.get('/', middleware.verifyToken, async (req, res, next) => {
  const ids = req.query.ids.split(',');

  try {
    const returnedOrders = await ordersService.getOrders(ids);
    logger.info(`💪 Returning Order with ids: ${ids} `);
    return res.status(200).json({ returnedOrders });
  } catch (err) {
    logger.error(`🔥 Error! ${err}`);
    return next(err);
  }
});

// POST to create order. Must HAVE RUNNER JOB ID
router.post('/', middleware.verifyToken, async (req, res, next) => {
  const requesterUserId = req.body.user_id;
  const list = req.body.list;
  const requesterLatitude = req.body.requester_latitude;
  const requesterLongitude = req.body.requester_longitude;

  try {
    const createdOrder = await ordersService.createOrder(requesterUserId, list,
      requesterLatitude, requesterLongitude);
    logger.info(`💪 ${requesterUserId} just created a new Order`);
    return res.status(201).json({ createdOrder });
  } catch (err) {
    logger.error(`🔥 Error! ${err}`);
    return next(err);
  }
});

// PUT to assign an order to runner
router.put('/assign', middleware.verifyToken, async (req, res, next) => {
  const runnerUserId = req.body.user_id;
  const runnerJobId = req.body.job_id;
  const storeName = req.body.store_name;
  const orderId = req.body.order_id;

  try {
    const assignedOrder = await ordersService.assignOrder(runnerUserId,
      runnerJobId, storeName, orderId);
    logger.info(`💪 ${runnerUserId} is now assigned to order ${orderId}`);
    return res.status(200).json({ assignedOrder });
  } catch (err) {
    logger.error(`🔥 Error! ${err}`);
    return next(err);
  }
});


module.exports = router;

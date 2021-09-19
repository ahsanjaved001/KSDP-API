const express = require('express');
const waitListController = require('./../controllers/waitListController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(waitListController.getAllWaitList);
  
module.exports = router;

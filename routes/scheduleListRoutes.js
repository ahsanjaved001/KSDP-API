const express = require('express');
const scheduleListController = require('./../controllers/scheduleListController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(scheduleListController.getAllScheduledList)
  .post(scheduleListController.createSchedule);

module.exports = router;

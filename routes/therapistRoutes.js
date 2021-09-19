const express = require('express');
const therapistController = require('./../controllers/therapistController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(therapistController.getAllTherapists)
  .post(therapistController.createTherapist);

module.exports = router;

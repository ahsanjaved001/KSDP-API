const express = require('express');
const patientController = require('./../controllers/patientController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(patientController.getAllPatients)
  .post(patientController.createPatient);

  router
  .route('/:id/getfreeslot')
  .get(patientController.getFreeSlot)
  .post(patientController.createPatient);

module.exports = router;

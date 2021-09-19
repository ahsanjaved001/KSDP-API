const Therapist = require('./../models/therapistModel');
const factory = require('./handlerFactory');

exports.getAllTherapists = factory.getAll(Therapist);
exports.createTherapist = factory.createOne(Therapist);

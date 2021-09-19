const WaitList = require('./../models/waitListModel');
const factory = require('./handlerFactory');

exports.getAllWaitList = factory.getAll(WaitList);

const ScheduledList = require('./../models/scheduleListModel');
const factory = require('./handlerFactory');

exports.getAllScheduledList = factory.getAll(ScheduledList);
exports.createSchedule = factory.createOne(ScheduledList);

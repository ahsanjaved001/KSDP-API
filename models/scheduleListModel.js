const mongoose = require('mongoose');

const scheduleListSchema = new mongoose.Schema(
    {
      patientID: {
        type: String,
      },
      patientName:{
        type: String
      },
      therapistID:{
          type: String
      },
      therapistName:{
          type: String
      },
      scheduledDate: {
        type: Date,
      },
      scheduledTime:{
        type: String
      },
      therapyType: {
        type: Array
      },
      status:{
          type: String,
          default: 'Pending'
      }
    }
  );

const ScheduleList = mongoose.models.scheduleListSchema || mongoose.model('ScheduleList', scheduleListSchema);

module.exports = ScheduleList;
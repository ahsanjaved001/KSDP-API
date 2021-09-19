const mongoose = require('mongoose');

const waitListSchema = new mongoose.Schema(
    {
      patientID: {
        type: String,
      },
      patientName:{
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      type: {
        type: Array
      },
      status:{
          type: String,
          default: 'Waiting'
      },
      remarks:{
          type: String
      },
      totalSessions: {
        type: Number
      },
      sessionFrequency:{
        type: String,
      },
      patientGender:{
        type: String
      }
    }
  );

const WaitingList = mongoose.models.waitListSchema || mongoose.model('WaitingList', waitListSchema);

module.exports = WaitingList;
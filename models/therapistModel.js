const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Fullname must be defined']
    },
    email: {
      type: String,
      required: [true, 'Email must be defined'],
    },
    gender: {
      type: String,
      required: [true, 'Gender must be defined'],
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: 'Gender is either: Male, Female, Other'
      }
    },
    therapistDept: {
      type: String,
      enum: {
        values: ['Occupational Therapy', 'Physical Therapy', 'Speech Therapy'],
        message: 'Therapist must belong to one dept: Occupational Therapy, Physical Therapy, Speech Therapy'
      }
    },
    workingDays: {
      type: Array
    },
    workingHours: {
      type: String
    },
    assignedPatients: {
      type: Array
    },
    workingSlots: {
      type: Array
    }
  }
);

therapistSchema.pre('save', function (next) {
  let count = 0;
  this.workingDays.map(day => {
    let hours = this.workingHours.slice(0, 2)
    for (let j = 0; j < 8; j++) {
      let timeStamp = day.slice(0, 3);
      let hour = (parseInt(hours) + j) % 12;
      if (hour == 0) hour = 12;
      timeStamp = timeStamp + hour;
      this.workingSlots[count] = timeStamp;
      count++;
    }
  })
  next();
});

const Therapist = mongoose.models.therapistSchema || mongoose.model('Therapist', therapistSchema);

module.exports = Therapist;
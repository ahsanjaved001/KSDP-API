const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: [true, 'Fullname must be defined']
      },
      age: {
        type: Number,
        required: [true, 'Age must be defined'],
        min: 0,
        max: 6.5
      },
      gender: {
        type: String,
        required: [true, 'Gender must be defined'],
        enum: {
          values: ['Male', 'Female', 'Other'],
          message: 'Gender is either: Male, Female, Other'
        }
      },
      weight: {
        type: String
      },
      height: {
        type: String
      },
      history:{
          type: String
      },
      availTherapy: {
          type: Boolean
      },
      therapyAreas: {
          type: Array,
      },
      guardianFullName:{
          type: String,
          required: [true, 'Guardian fullname must be defined']
      },
      guardianCNIC:{
          type: String,
          required: [true, 'Guardian CNIC must be defined']
      },
      address:{
        type: String
      },
      totalSessions: {
        type: Number
      },
      sessionFrequency:{
        type: String
      }
    }
  );

const Patient = mongoose.models.patientSchema || mongoose.model('Patient', patientSchema);

module.exports = Patient;
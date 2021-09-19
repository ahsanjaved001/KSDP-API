const Patient = require('./../models/patientModel');
const WaitList = require('./../models/waitListModel');
const Therapist = require('./../models/therapistModel');
const scheduleList = require('./../models/scheduleListModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const date = require('date-and-time');


exports.getAllPatients = factory.getAll(Patient);

exports.createPatient = catchAsync(async (req, res, next) => {
  const doc = await Patient.create(req.body);
  //    console.log(doc);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.createPatient = async (req, res) => {
  try {
    const doc = await Patient.create(req.body);
    //Wait List Here
    const obj = {
      patientID: doc._id,
      patientName: doc.fullName,
      type: doc.therapyAreas,
      remarks: req.body.remarks,
      totalSessions: req.body.totalSessions,
      sessionFrequency: req.body.sessionFrequency,
      patientGender: req.body.gender
    };
    await WaitList.create(obj);

    // Returning Patient Doc
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getFreeSlot = async (req, res, next) => {
  let patientDoc = await Patient.findById(req.params.id);
  let therapistDoc = await Therapist.find({ therapistDept: `${patientDoc.therapyAreas[0]}` });

  for (let i = 0; i < therapistDoc.length; i++) {
    let scheduleListDoc = await scheduleList.find({ therapistID: `${therapistDoc[i]._id}` });
    if (scheduleListDoc.length === 0) {
      // no booked value found in scheduled sheet, return firts slot of this therapist
      let timeStamp = `${therapistDoc[i].workingHours.slice(0, 4)} - ${parseInt(therapistDoc[i].workingHours.slice(0, 2)) + 1}${therapistDoc[i].workingHours.slice(2, 4)}`;
      if (!timeStamp)
        timeStamp = '10am - 11am';
      var availableTherappist = {
        id: therapistDoc[i]._id,
        fullName: therapistDoc[i].fullName,
        Date: "2021-09-21",
        timeSlot: timeStamp,
        therapyAreas: patientDoc.therapyAreas
      }
    }
    else {

      //let freeslot = findSlot(scheduleListDoc,therapistDoc[i]);
      var availableTherappist = {
        id: therapistDoc[i]._id,
        fullName: therapistDoc[i].fullName,
        Date: "2021-09-25",
        timeSlot: timeStamp,
        therapyAreas: patientDoc.therapyAreas
      }
    }

  }
  res.status(201).json({
    status: 'success',
    data: {
      data: availableTherappist
    }
  });
}


// async function findSlot() {

//       let patientDay = date.format(scheduleListDoc[0].scheduledDate, 'ddd');
//       let patientTime = scheduleListDoc[0].scheduledTime.slice(0, 2);
//       var patientStamp = patientDay + patientTime;

//   return patientStamp;
// }


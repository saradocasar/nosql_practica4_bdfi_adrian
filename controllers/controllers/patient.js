// Cargamos los modelos para usarlos posteriormente
const Patient = require('../models/patient');

exports.list = async function () {
    let result = await Patient.find({});
    return result;
}

exports.read = async function (patientId) {
    let result = await Patient.find({"_id": patientId});
    return result[0]; 
}

exports.create = async function (body) {
    let result1 = await Patient.insertMany(body);
    let result2 = await Patient.findOneAndUpdate({"_id": result1[0]._id}, {
        $set: {
            "premium": true
         }
    }, {new: true});
    return result2; 
}

exports.update = async function (patientId, body) {
    let result = await Patient.findOneAndUpdate({"_id": patientId}, body, {new: true});
    return result;
}

exports.delete = async function (patientId) {
    let result = await Patient.deleteOne({_id: patientId});
    return result[0]; 
}

exports.filterPatientsByCity = async function (city) {
    let result= await Patient.find({"city": city});
    return result; 
}

exports.filterPatientsByDiagnosis = async function (diagnosis) {
    let result= await Patient.find({"medicalHistory.diagnosis": diagnosis});
    return result; 
}

exports.filterPatientsBySpeacialistAndDate = async function (specialist, sDate, fDate) {
    let result = await Patient.aggregate([
        {$match: {
                "$and":[
                    {"medicalHistory.specialist": specialist},
                    {"medicalHistory.date": {$gte: fDate, $lte: sDate}}
                ]       
            }
        }
    ])
    console.log(result)
    return result; 
}

exports.addPatientHistory = async function (patientId, medicalRecord) {
    let result= await Patient.findOneAndUpdate(
        {_id: patientId},
        {$push: 
            {"medicalHistory": medicalRecord}
        },
        {new: true}
    )
    console.log(result) 
    return result;
}
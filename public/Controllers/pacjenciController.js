exports.showPatientList = (req,res,next) => {
    res.render('../public/Pacjenci/SzpitalPacjenci', {})
}
exports.addPatientForm = (req,res,next) => {
    res.render('../public/Pacjenci/AddPacjent', {})
}
exports.showPatientDetails = (req,res,next) => {
    res.render('../public/Pacjenci/PacjenciDetails', {})
}


const DeptRepository = require('../../repository/PatientsRepository');

exports.showPatientList = (req,res,next)=>{
    DeptRepository.getPatient().then(emps=>{
        res.render('../public/Pacjenci/SzpitalPacjenci',{
            emps:emps,
            navLocation:'emp'
        });
    });
}
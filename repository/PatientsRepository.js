const db = require('../config/mysql12/db');

exports.getPatient = () =>{
    return db.promise().query('SELECT * FROM Pacjenci').then((results,fields)=>{
        console.log(results[0]);
        return results[0]
    })   .catch(err=>{
        console.log(err);
        throw err
    })
} ;
exports.getPatientById = (empID) =>{

} ;
exports.createPatient = (newEmpData) =>{

} ;
exports.updatePatient = (empId, empData) =>{

} ;
exports.deletePatient = (empId) =>{

} ;
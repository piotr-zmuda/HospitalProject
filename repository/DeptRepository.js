const db = require('../config/mysql12/db');

exports.getDept = () =>{
    return db.promise().query('SELECT * FROM Oddziały').then((results,fields)=>{
        console.log(results[0]);
        return results[0]
    })   .catch(err=>{
        console.log(err);
        throw err
    })
} ;
exports.getDeptById = (empID) =>{

} ;
exports.createDept = (newEmpData) =>{

} ;
exports.updateDept = (empId, empData) =>{

} ;
exports.deleteDept = (empId) =>{

} ;
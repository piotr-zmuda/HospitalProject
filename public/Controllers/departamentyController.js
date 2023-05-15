exports.showDeptList = (req,res,next) => {
    res.render('../public/Oddziały/SzpitalDept',{})
}
exports.addDeptForm = (req,res,next) => {
    res.render('../public/Oddziały/AddDept',{})
}
exports.showDeptDetails = (req,res,next) => {
    res.render('../public/Oddziały/OddzialDetails',{})
}

const DeptRepository = require('../../repository/DeptRepository');

exports.showDeptList = (req,res,next)=>{
    DeptRepository.getDept().then(emps=>{
        res.render('../public/Oddziały/SzpitalDept',{
            emps:emps,
            navLocation:'emp'
        });
    });
}
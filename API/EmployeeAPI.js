const EmployeeRepository = require('../repository/EmployeeRepository');

exports.getEmployees = (req, res, next) => {
    EmployeeRepository.getEmpolayees().then(emps=>{
        res.status(200).json(emps);
    }).catch(err=>{
        console.log(err);
    })
};
exports.getEmployeesById = (req,res,next) =>{
    const empId = req.params.empId;
    EmployeeRepository.getEmpolayeesById(empId).then(emp =>{
        if(!emp){
            res.status(404).json({
                message: "Employee with id:"+empId+"not found"
            })
        }else{
            res.status(200).json(emp);
        }
    })
}
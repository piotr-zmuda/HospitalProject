const employeeRepository = require('../../repository/EmployeeRepository');
const DeptRepository = require('../../repository/DeptRepository');
const EmploymentRepository = require('../../repository/EmploymentRepository');
exports.showEmploymentList = (req,res,next) => {
    res.render('../Employment/Employments', {})
};
exports.addEmploymentForm = (req,res,next) => {
    res.render('../Employment/AddEmployment', {})
}
exports.showEmploymentDetails = (req,res,next) => {
    res.render('../Employment/EmploymentsDetails', {})
}
    exports.showEmploymentList = (req,res,next)=>{
        EmploymentRepository.getEmployments().then(emps=>{
            console.log(emps);
            res.render('../public/Employment/Employments',{
                emps:emps,
                navLocation:'emp'
            });
        });
    }
    exports.showAddEmploymentForm = (req,res,next)=>{
        let allEmps, allDepts;
        employeeRepository.getEmpolayees().then(emps=>{
            allEmps=emps;
            return DeptRepository.getDept();
        }).then(depts=>{
            allDepts=depts;
            res.render('../public/Employment/AddEmployment',{
                employment:{},
                formMode:'createNew',
                allEmps:allEmps,
                allDepts:allDepts,
                pageTitle:'Nowe zatrudnienia',
                btnLabel:'Dodaj zatrudnienie',
                formAction:'/employments/add',
                navLocation:'employment'
            })
        })
    }
    exports.showEditEmploymentForm = (req,res,next)=>{
        const empId=req.params.empId;
        console.log(empId);
        EmploymentRepository.getEmploymentById(empId).then(emps=>{
            res.render('../public/Employment/EmploymentDetails',{
                emp:emps[0],
                formMode:'edit',
                pageTitle:'Edycja Zatrudnienia',
                btnLabel:'Edytuj zatrudnienie',
                formAction:'/Employments/edit',
                navLocation:'emp'
            });
        });
    }
    exports.showEmploymentDetails = (req,res,next)=>{
        const empId=req.params.empId;
        EmploymentRepository.getEmploymentById(empId).then(emps=>{
            console.log(emps)
            res.render('../public/Employment/EmploymentDetails',{
                emp:emps[0],
                formMode:'showDetails',
                pageTitle:'Szczegóły pracownika',
                formAction:'',
                navLocation:'emp'
            });
        });
    }



    exports.createEmployment = (req,res,next)=>{
        const empData = { ...req.body};
        console.log('body')
        console.log(req.body)
        EmploymentRepository.createEmployment(empData).then(result =>{
            res.redirect('/employments');
        })
    }

    exports.updateEmployment = (req,res,next)=>{
        const empData = { ...req.body};
        const empId = req.body._id;
        EmploymentRepository.updateEmployment(empId,empData).then(result =>{
            res.redirect('/employments');
        })
    }

    exports.deleteEmployment = (req,res,next)=>{
        console.log(req.params)
        const empId = req.params.empId;
        console.log(empId)
        EmploymentRepository.deleteEmployment(empId).then(result =>{
            res.redirect('/employments');
        })
    }




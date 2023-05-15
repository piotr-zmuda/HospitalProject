exports.showEmployeeList = (req,res,next) => {
    res.render('../Lekarze/SzpitalWorkers', {})
}
exports.addEmployeeForm = (req,res,next) => {
    res.render('../Lekarze/AddWorker', {})
}
exports.showEmployeeDetails = (req,res,next) => {
    res.render('../Lekarze/WorkersDetails', {})
}

const EmployeeRepository = require('../../repository/EmployeeRepository');

exports.showEmployeeList = (req,res,next)=>{
    EmployeeRepository.getEmpolayees().then(emps=>{
        res.render('../public/Lekarze/SzpitalWorkers',{
            emps:emps,
            navLocation:'emp'
        });
    });
}
exports.showAddEmployeeForm = (req,res,next)=>{
        res.render('../public/Lekarze/AddWorker',{
            emp:{},
                pageTitle: req.__('emp.form.add.pageTitle'),
            formMode:'createNew',
            btnLabel:'Dodaj pracownika',
            formAction:'/employees/add',
            navLovation:'emp',
            validationErrors: []
        });
}
exports.showEditEmployeeForm = (req,res,next)=>{
    const empId=req.params.empId;
    console.log(empId);
    EmployeeRepository.getEmpolayeesById(empId).then(emps=>{
        res.render('../public/Lekarze/WorkersDetails',{
            emp:req.__(emps),
            formMode:'edit',
            pageTitle:'EdycjaPracownika',
            btnLabel:'Edytuj pracownika',
            formAction:'/employees/edit',
            navLocation:'emp'
        });
    });
}
exports.showEmployeeDetails = (req,res,next)=>{
    const empId=req.params.empId;
    console.log(empId);
    EmployeeRepository.getEmpolayeesById(empId).then(emps=>{
        res.render('../public/Lekarze/WorkersDetails',{
            emp:emps,
            formMode:'showDetails',
            pageTitle:'Szczegóły pracownika',
            formAction:'',
            navLocation:'emp'
        });
    });
}



exports.addEmployee = (req,res,next)=>{
    const empData = { ...req.body};

    EmployeeRepository.createEmpolayee(empData).then(result =>{
        res.redirect('/employees');
    }).catch(err=>{
        console.log(err.details)
        res.render('../public/Lekarze/AddWorker',{
            emp:empData,
            pageTitle:'Nowy Pracownik',
            formMode:'createNew',
            btnLabel:'Dodaj pracownika',
            formAction:'/employees/add',
            navLovation:'emp',
            validationErrors: err.details
        })
    })
}

exports.updateEmployee = (req,res,next)=>{
    const empData = { ...req.body};
    const empId = req.body._id;
    EmployeeRepository.updateEmpolayee(empId,empData).then(result =>{
        res.redirect('/employees');
    })
}

exports.deleteEmployee = (req,res,next)=>{
    console.log(req.params)
    const empId = req.params.empId;
    console.log(empId)
    EmployeeRepository.deleteEmployee(empId).then(result =>{
        res.redirect('/employees');
    })
}



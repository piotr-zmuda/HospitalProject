const EmployeeRepository = require('../../repository/EmployeeRepository');

exports.login = (req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;
    EmployeeRepository.findByEmail(email).then(emp=>{

        console.log(emp[0].password)
        console.log(password)
        if ( emp[0].password === password){
            console.log("prawda")
        }
        if(!emp){
            console.log("tutaj 1 ")
            res.render('../views/index',{
                navLocation : '',
                loginError: "Nieprawidłowy adres email lub hasło"

            })
        }else if ( emp[0].password === password)
        {
            console.log(emp[0])
            console.log("tutaj 2")

            req.session.loggedUser = emp[0];

            res.redirect('/');
        }
        else{
            console.log("tutaj 3")
            res.render('../views/index' , {

                navLocation:'',
                loginError:"Nieprawidłowy adres email lub hasło",
            })
        }

    }).catch(err => {
        console.log(err)
    })
}



exports.logout = (req , res , next) =>{
    req.session.loggedUser = undefined;
    res.redirect('/');
}
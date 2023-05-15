const db = require('../config/mysql12/db');
const empSchema = require('../public/model/joi/Employee');

exports.getEmpolayees = () =>{
     return db.promise().query('SELECT * FROM Lekarze').then((results,fields)=>{
         console.log(results[0]);
         return results[0]
     })   .catch(err=>{
         console.log(err);
         throw err
     })
} ;
exports.getEmpolayeesById = (empId) =>{
    const query = `SELECT e._id as _id, e.Imie, e.Nazwisko, e.email, empl._id as empl_id, 
    empl.salary, empl.dateFrom, dept._id as dept_id, empl.dateTo, dept.Nazwa, dept.Budzet
    FROM Lekarze e
    left join Employment empl on empl.emp_id = e._id
    left join Oddziały dept on empl.dept_id=dept._id
    where e._id=?`

    return db.promise().query(query, [empId]).then(

        (results,fields) => {
            const firstRow= results[0][0];
            if(!firstRow){
                return {};
            }
            const emp={
                _id:parseInt(empId),
                Imie:(firstRow.Imie),
                Nazwisko:firstRow.Nazwisko,
                email:firstRow.email,
                employments:[]
            }
            for(let i=0;i<results[0].length; i++)
            {
                const row = results[0][i];
                if(row.empl_id)
                {
                    const employment = {
                        _id:row.empl_id,
                        salary:row.salary,
                        dateFrom:row.dateFrom,
                        dateTo:row.dateTo,
                        Oddział:{
                            _id:row.dept_id,
                            Nazwa:row.Nazwa,
                            budzet:row.Budzet

                        }
                    };
                    emp.employments.push(employment);
                }
            }
            return emp;
        }
    ).catch(err => {
        console.log(err);
        throw err;
    })
} ;



exports.createEmpolayee = (newEmpData) =>{
    console.log(newEmpData)
    const vRes = empSchema.validate(newEmpData, {abortEarly : false});
    if(vRes.error){
        return Promise.reject(vRes.error)
    }
    const firstName = newEmpData.Imie;
    const lastName = newEmpData.Nazwisko;
    const email = newEmpData.email;
    const sql = 'INSERT into Lekarze (Imie, Nazwisko, email) VALUES (?,?,?)'
    return db.promise().execute(sql,[firstName,lastName,email])
} ;
exports.updateEmpolayee = (empId, empData) =>{
    const firstName = empData.Imie;
    const lastName = empData.Nazwisko;
    const email = empData.email;
    const sql = 'UPDATE Lekarze set Imie=?, Nazwisko=?, email=? where _id=?';
    return db.promise().execute(sql,[firstName,lastName,email,empId])
} ;
exports.deleteEmployee = (empId) =>{
    console.log("alala" + empId)
    const sql1=`DELETE FROM Lekarze where _id=?`
    const sql2=`DELETE FROM Employment where emp_id=?`
    return db.promise().execute(sql1,[empId])
} ;

exports.findByEmail = (email) =>{
    const query = `SELECT imie,nazwisko,email,password
    FROM Lekarze
    where email=?`
    return db.promise().query(query,[email]).then((results,fields)=>{
        console.log(results[0]);
        return results[0]
    })   .catch(err=>{
        console.log(err);
        throw err
    })
}
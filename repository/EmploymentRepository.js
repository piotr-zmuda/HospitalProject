const db = require('../config/mysql12/db');

exports.getEmployments=() =>{
    const query = `SELECT empl._id as empl_id, empl.salary, empl.dateFrom, empl.dateTo, dept._id as dept_id, dept.Nazwa, dept.Budzet, e._id as emp_id, e.Imie, e.Nazwisko, e.email
    From Employment empl
    left join Lekarze e on empl.emp_id = e._id
    left join Oddziały dept on empl.dept_id = dept._id`
    return db.promise().query(query).then((results,fields)=>{
        const employments = [];
        for(let i=0;i<results[0].length; i++)
        {
            const row = results[0][i];
                const employment = {
                    _id:row.empl_id,
                    salary:row.salary,
                    dateFrom:row.dateFrom,
                    dateTo:row.dateTo,
                    Oddział:{
                        _id:row.dept_id,
                        Nazwa:row.Nazwa,
                        budzet:row.Budzet
                    },
                    employee:{
                        _id:row.emp_id,
                        Imie:row.Imie,
                        Nazwisko:row.Nazwisko,
                        email:row.email

                    }
                };
                employments.push(employment);
        }
        console.log(employments);
        return employments
    }).catch(err=>{
        console.log(err)
    })
}

exports.getEmploymentById=(employmentId) =>{
    const query = `SELECT empl._id as empl_id, empl.salary, empl.dateFrom, empl.dateTo, dept._id as dept_id, dept.Nazwa, dept.Budzet, e._id as emp_id, e.Imie, e.Nazwisko, e.email
    From Employment empl
    left join Lekarze e on empl.emp_id = e._id
    left join Oddziały dept on empl.dept_id = dept._id
    where empl._id=?`
    return db.promise().query(query, [employmentId]).then((results,fields)=>{
        const employments = [];
        const row = results[0][0];
        if(!row){
            return {};
        }
        if(row.empl_id)
        {
            const employment = {
                _id:row.empl_id,
                salary:row.salary,
                dateFrom:row.dateFrom,
                dateTo:row.dateTo,
                employee:{
                    _id:row.emp_id,
                    Imie:row.Imie,
                    Nazwisko:row.Nazwisko,
                    email:row.email

                },
                Oddział:{
                    _id:row.dept_id,
                    Nazwa:row.Nazwa,
                    budzet:row.Budzet
                }

            };
            employments.push(employment)
        }
        console.log(employments)
        return employments
    }).catch(err=>{
        console.log(err)
    })
};
exports.createEmployment = (data) =>{
    console.log('createEmploy');
    console.log(data);
    const sql = 'INSERT into Employment (emp_id, dept_id, salary, dateFrom, dateTo) VALUES (?,?,?,?,?)';
    return db.promise().execute(sql,[data.emp_Id,data.dept_Id,data.salary,data.dateFrom,data.dateTo]);
}

exports.updateEmployment = (employmentId, empData) =>{
    console.log(empData)
    const emp_id = empData.emp_id;
    const dept_id = empData.dept_id;
    const salary = empData.salary;
    const dateFrom = empData.dateFrom;
    const dateTo = empData.dateTo;
    console.log('createEmploy');
    const sql = 'UPDATE Employment set emp_id=?, dept_id=?, salary=?, dateFrom=?, dateTo=? where _id=?';
    return db.promise().execute(sql,[emp_id,dept_id,salary,dateFrom,dateTo,employmentId]);
}

exports.deleteEmployment = (employmentId) =>{
    console.log('createEmploy');
    const sql = 'DELETE FROM Employment where _id=?';
    return db.promise().execute(sql,[employmentId]);
}

exports.deleteEmployments = (employmentIds) =>{
    console.log('createEmploy');
    const sql = 'DELETE FROM Employment where _id IN (?)';
    return db.promise().execute(sql,[employmentIds]);
}
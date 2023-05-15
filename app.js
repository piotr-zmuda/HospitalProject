var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const i18n = require('i18n');

var app = express();
app.use(session({
  secret : '123',
  resave:false
}));
app.use((req,res,next)=>{
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});

i18n.configure(app, {
  locales: ['pl', 'eng'],
  directory:path.join(__dirname, 'locales'),
  objectNotation: true,
  cookie: 'acme-hr-lang',
})
app.use(cookieParser('secret'));
app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});
var indexRouter = require('./routes/index');
var employeeRouter = require('./routes/EmployeeRoutes');
var deptRouter = require('./routes/DeptRoutes');
var patientRouter = require('./routes/PatientRoutes');
var employmentRouter = require('./routes/EmploymentsRoutes');
const empApiRouter = require('./routes/api/EmployeeApiRoute');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api/employees', empApiRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use ('/employees',employeeRouter);
app.use ('/dept',deptRouter);
app.use ('/patients',patientRouter);
app.use('/employments', employmentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

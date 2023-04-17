var express = require('express');
var router = express.Router();
var db = require('./db')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Software Development NEC' });
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});
router.get('/signin', function (req, res, next) {
  res.render('signin');
});
router.get('/admin', function (req, res, next) {
  res.render('admin');
});
router.get('/allusers', function (req, res, next) {
  db.query('select * from user', function (error, result) {
    if (error) {
      console.log(error)
    }
    else {
      if (result.length > 0) {
        console.log(result)
        const data = result.map(result => ({
          rc: result.rc,
          email: result.user_email,
          password: result.password
        }));
        console.log(data)
        res.render('allusers', { data: data });
      }
    }
  })
});

router.post('/adduser', function (req, res) {
  db.query('insert into sdcone.user (rc,user_email,password) values (?,?,?)', [
    req.body.rc,
    req.body.user_email,
    req.body.password

  ], function (error, result) {
    if (error) {
      console.log(error)
    }
    else {
      console.log("Record Submitted Succesfully");
      res.redirect('/signup')
    }
  })
});

router.post('/login', function (req, res) {
  db.query('select * from user where user_email= ? and password=?', [
    req.body.user_email,
    req.body.password

  ], function (error, result) {
    if (error) {
      console.log(error)
      res.redirect('/signin')
    }
    else {
      if (result.length > 0) {
        console.log("Login");
        res.redirect('/allusers')
      } else {
        console.log('id or password is incorrect')
        res.redirect('/signin')
      }
    }
  })
});

router.post('/admin_login', function (req, res) {
  db.query('select * from admin where admin_email= ? and password=?', [
    req.body.admin_email,
    req.body.password
  ], function (error, result) {
    if (error) {
      console.log(error)
      res.redirect('/admin')
    }
    else {
      if (result.length > 0) {
        console.log("Login");
        res.redirect('/allusers')
      } else {
        console.log('id or password is incorrect')
        res.redirect('/admin')
      }
    }
  })
});

module.exports = router;

const express = require('express');
const app = express();
const PORT  = process.env.PORT || 3500;
const path = require('path');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const countries = require('./countries');
const fs = require('fs');

const con = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6636938',
    password: 'sjfSGyYpM1',
    database: 'sql6636938'
});;

async function emailTransport(userEmail, userName) {
  const transport = nodemailer.createTransport({
    tls: {rejectUnauthorized: false },
  
    service: 'Hotmail',
    auth: {
      user: 'dev_agency062204032905@outlook.com',
      pass: 'ashlieKim'
    }
  });
  
  const mailOption = {
    from: 'dev_agency062204032905@outlook.com',
    to: userEmail.trim(),
    subject: 'Signup Confirmation',
    html: `<p>Hello ${userName},<p>
           <p>Welcome to our application, your ultimate weather companion designed to keep you informed and prepared for any forecast. Whether you're planning a weekend getaway, a day at the beach, or simply need to know if you should carry an umbrella, [WeatherApp] has got you covered.</p>
           <p>We're thrilled to have you on board and
           thank you for choosing our Application!</p>
           <p>Best regards,</p>
           <p>Jhonwell Espa</p>`
  };

    transport.sendMail(mailOption, err => {
    if (err) throw err; 
    console.log('Email Sent!'); 
  });
  
}


con.connect(err => {
    if (err) console.log(err)
    console.log('connected!');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


/* Signup */
let info = [];
let signCheck = {status: undefined, email:undefined};
let c = true;
app.post('/signup', async (req, res, next) => {
  /* console.log(req.body); */
  /* Validation */
    const sql2 = `Select * FROM personal_info`;
   con.query(sql2, (err, result) => {
    if (err) throw err;
    info = [...result];


    function myRes(res) {
      c = false;
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }

    info.forEach(user => {
      if (user.user_name == req.body.username) {
        signCheck.status = false;
        myRes(res);
      }
    });

    info.forEach(user => {
      if (user.email == req.body.email) {
        signCheck.email = false;
        myRes(res);
      }
    })


    if (!c) return;

    const sql2 = `INSERT INTO personal_info (user_name, email, password) 
               VALUES ("${req.body.username}", "${req.body.email}", "${req.body.password}")`;
    con.query(sql2, (err, result) => {
    if (err) {
      signCheck.status = false;
      signCheck.email = false;
      throw err;
    };
   // emailTransport(req.body.email, req.body.userName);
    console.log('database updated!'); 
    signCheck.status = true;
    signCheck.email = true;
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  });
})

app.get('/signup/checker', (req, res) => {
  res.json(signCheck);
  signCheck.status = undefined;
  signCheck.email = undefined;
  c = true;
})

/* Login */
let data;
let authChecker;
app.post('/userlogin', (req, res, next) => {
  const sql = `SELECT user_id FROM personal_info
               WHERE user_name = ? AND password = ?`;
  con.query(sql, [req.body.username, req.body.password], (err, result) => {
    if (err) throw err;

    console.log(result)
    if (result.length <= 0) {
    data = {};
    res.sendFile(path.join(__dirname, 'public', 'error.html'));
    return;
    } 
    data = {
      'loginfo': req.body,
       result
    };  
    authChecker = true;
    res.sendFile(path.join(__dirname, 'public', 'dataPlace.html'));
});
});
  
app.get('/login/data', (req, res) => {
  res.json(data);
});

app.get('/countries', (req, res) => {
  res.json(countries);
});

function auth(req, res, next) {
  req.user = authChecker;
  next();
}

app.get('/home', auth, (req, res) => {
  if (req.user == true) {
    res.sendFile(path.join(__dirname, 'public', 'home.html'))
  } else {
    res.sendFile(path.join(__dirname, 'public', '404_page.html'))

  }
});

app.get('/userInfo', (req, res) => {
  const sql = `Select * FROM personal_info`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
})

/* Settings Update */
let dataError = {};
let dataUpdate = {};


app.post('/home', (req, res) => {
  const sql = `SELECT * FROM personal_info WHERE user_id = ${data.result[0].user_id}`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    
    function myChanger(cmp, info) {
        const sql2 = `UPDATE personal_info
                      SET ${cmp} = "${info}"
                      WHERE user_id = ${result[0].user_id}`;
        con.query(sql2, (err, result) => {
          if (err) throw err;

          /* If the change was successful */
          dataUpdate.saved = true;
          if (cmp == 'password') {
            dataUpdate.password = true;
          }
          console.log(`${info} Updatedd!!`);
        })
    }

    //cmp = user_name
    //info = req.body.username

    //orig = user_name
    //req = req.body.username
    const sqlAll = `SELECT * FROM personal_info WHERE user_id != ${data.result[0].user_id}`;
    con.query(sqlAll, (err, result) => {
      if (err) throw err;

      function myChecker(origInfo, reqInfo) {
        for (let i = 0; i < result.length; i++) {
          if (result[i][origInfo] == reqInfo) {
            dataUpdate[`same_${origInfo}`] = true;
            dataError[origInfo] = reqInfo;
          }
        }
      }
      myChanger('password', req.body.password);
    
      myChecker('user_name', req.body.username);
      myChecker('email', req.body.email);

      if (dataUpdate['same_user_name'] != true) {
        myChanger('user_name', req.body.username)
      }      
      
      if (dataUpdate['same_email'] != true) {
        myChanger('email', req.body.email);
      }

      res.sendFile(path.join(__dirname, 'public', 'home.html'));

    })

    /* myChanger('user_name', req.body.username);
    myChanger('email', req.body.email); */
  })
  
});

//settings api 
app.get('/updateData', (req, res) => {
  res.json(dataUpdate);
  dataUpdate.same_email = false;
  dataUpdate.same_user_name = false;
  dataUpdate.password = false;
});

app.get('/errorData', (req, res) => {
  res.json(dataError);
  dataError = {};
})

app.get('/gifPic', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '404_error_page.gif'));
});

app.post('/logChecker', (req, res) => {
  if (req.body.logout == true) {
    authChecker = false;
  } 
});

app.get('/errorBack', (req, res) => {
  res.json({login: authChecker});
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '404_page.html'));
})

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
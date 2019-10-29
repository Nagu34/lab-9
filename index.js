var express= require('express');
var app=express();
var bodyParser = require('body-parser');
var route= require('./route.js');
//to parse requests
app.use(bodyParser.urlencoded({ extended: true }));

//get the middleware to cookieparser variable
var cookieParser= require('cookie-parser');

//use the middleware cookieparser
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));
//pugsetup
app.set('view engine','pug');
app.set('views','./views');


app.get('/index',function(req,res){
   var Firstname='Firstname:'+(req.cookies.userdata.Firstname);
   var Lastname='Lastname:'+(req.cookies.userdata.Lastname);
   var Email='Email:'+(req.cookies.userdata.Email);
   var Name=Firstname+' , '+Lastname+' , '+Email;
   res.send(Name);

});

app.get('/login',function (req,res) {
   res.render('login');
});

app.post('/login',function (req,res){
   console.log(req.body);
   if(req.body.Email===req.cookies.userdata.Email || req.body.Password===req.cookies.userdata.Password) {
      res.redirect('/index');
   }
   else res.send('Invalid credentials');
});


app.get('/register',function (req,res) {
   res.render('register');

});





app.post('/register',function(req,res) {
   console.log(req.body);
   const Firstname = req.body.Firstname;
   const Lastname = req.body.Lastname;
   const Email = req.body.Email;
   const Password = req.body.Password;
   let user={Firstname: Firstname, Lastname: Lastname, Email: Email, Password: Password};
   res.cookie("userdata",user);
   res.redirect('/login');
});



let users= {
   name: "nagababu",
   email: "nagababuchilukuri34@gmail.com"
};
app.get('/',(req,res)=>{
   res.redirect('/register');
});
//Listening to nodeJS Application
app.listen(3000, function(){
   console.log("Listening to port 3000")
});

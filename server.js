const express = require('express')
const ejs = require('ejs')
const app = express()
const passport = require('passport')
const database = require('./database');
const init = require('./userAuth')
const session = require('express-session');

app.set('view-engine','ejs')
init(passport)

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'CHEESEBURGER UGHHH',
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())

app.use(passport.session())

app.get('/register',(req,res)=>{
    res.render('register.ejs')
})

app.post('/register',(req,res)=>{
    console.log(req.body.name,req.body.password)
    database.CreateUser(req.body.name,req.body.password)
    res.redirect('/login')
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.post('/login',checkNotAuth,passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))  

function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuth(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return next()
}



app.listen(8080,()=>{
    console.log(`server listening at localhost:8080`)
})

// id = 2 HentaiHater00 ilovelolis

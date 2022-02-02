const express = require('express')
const ejs = require('ejs')
const app = express()
const passport = require('passport')
const init = require('./userAuth')
const database = require('./database')
const session = require('express-session');
const flash = require('express-flash');
var SQLiteStore = require('connect-sqlite3')(session);
app.set('view-engine','ejs')
init(passport)
app.use(flash())
app.use(express.urlencoded({extended:false}))


app.use(session({
    secret:'CHEESEBURGER UGHHH',
    resave:false,
    saveUninitialized:false,
    store:new SQLiteStore({db:'sessions.db',dir:'./'})
}))

app.use(passport.initialize())

app.use(passport.authenticate('session'))

app.get('/',(req,res)=> res.redirect('/succ'))

app.get('/succ',checkAuth,(req,res)=>{
    res.render('home.ejs',{name:req.user.name})
})

app.post('/succ',(req,res)=>{
    req.logout();
    res.redirect('/login')
})

app.get('/register',checkNotAuth,(req,res)=>{
    res.render('register.ejs')
})

app.post('/register',checkNotAuth,(req,res)=>{
    console.log(req.body.name,req.body.password)
    database.CreateUser(req.body.name,req.body.password)
    res.redirect('/login')
})

app.get('/login',checkNotAuth,(req,res)=>{
    res.render('login.ejs')
})

app.post('/login',checkNotAuth,passport.authenticate('local',{
    successRedirect:'/succ',
    failureRedirect:'/login',
    failureFlash:true
}))  

function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    console.log('fail')
    res.redirect('/login')
}

function checkNotAuth(req,res,next){
    if(req.isAuthenticated()){
        console.log('succ')
        return res.redirect('/succ')
    }
    next()
}



app.listen(8080,()=>{
    console.log(`server listening at localhost:8080`)
})

// id = 2 HentaiHater00 ilovelolis

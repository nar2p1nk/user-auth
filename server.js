const express = require('express')
const ejs = require('ejs')
const app = express()
const database = require('./database');
app.set('view-engine','ejs')

app.use(express.urlencoded({extended:false}))

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

app.listen(8080,()=>{
    console.log(`server listening at localhost:8080`)
})

// id = 2 HentaiHater00 ilovelolis

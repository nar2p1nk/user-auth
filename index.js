const express = require('express');

const sqlite = require('sqlite3')

const bcrypt = require('bcrypt')

const db = new sqlite.Database('users.db')

function CreateUser(name,password){
    const salt = bcrypt.genSaltSync(10);
    console.log(salt)
    const HashedPassword = bcrypt.hashSync(password,salt)
    db.run(`INSERT INTO user(name,password) VALUES(?,?)`,
        [name,HashedPassword],
        (err)=>{
            if(err){console.error(err.message)}
            else{console.log('insertion completed')}
        }
)
}

//CreateUser('billy','animelover99')

function Validation(hash){
    db.get(`SELECT password FROM user WHERE id = 1`,(err,row)=>{
        if(err){console.error(err.message)}
        else{
            const isValid = bcrypt.compareSync('animelover9',row.password)
            console.log(isValid)
        }
    })
}
Validation()

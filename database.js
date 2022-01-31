const sqlite = require('sqlite3')

const bcrypt = require('bcrypt')

const db = new sqlite.Database('users.db')

function CreateUser(name,password){
    salt = bcrypt.genSaltSync(10)
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

function Validation(password,id){
    db.get(`SELECT password FROM user WHERE id = ?`,[id],(err,user)=>{
        if(err){console.error(err.message)}
        else{
            isValidated = bcrypt.compareSync(password, user.password)
            console.log(isValidated)
        }
    })
}

module.exports = {CreateUser,Validation}

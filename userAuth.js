const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const sqlite = require('sqlite3')

const db = new sqlite.Database('users.db')

function init(passport,name){
    const auth = async(name,password,done)=>{
        db.get(`SELECT * FROM user WHERE name = ?`,[name],async (err,row) =>{

        if(row == null){
            return done(null,false,{message:'no user found'})
        }
        try{
            if(await bcrypt.compare(password,row.password)){
                return done(null,row)
            }
        }
        catch(e){return done(e)}
    } )}
    passport.use(new LocalStrategy({usernameField:'name'},auth))
    passport.serializeUser((row,done)=> done(null,row.Id) )
    passport.deserializeUser((id,done)=> done(null,getUserById(id))
    )

}

module.exports = init




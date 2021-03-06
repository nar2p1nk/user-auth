const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const sqlite = require('sqlite3')

const db = new sqlite.Database('users.db')

function init(passport,name){
    const auth = (name,password,done)=>{
        db.get(`SELECT * FROM user WHERE name = ?`,[name],async (err,row) =>{

        if(row == null){
            return done(null,false,{message:'no user found'})
        }
        try{
            if(await bcrypt.compare(password,row.password)){
                return done(null,row)
            }
            else{ return done(null,false,{message:'incorrect password'}) }
        }
        catch(e){return done(e)}
    } )}
    passport.use(new LocalStrategy({usernameField:'name'},auth))
    passport.serializeUser((row,done)=> {
        console.log('serail')
        process.nextTick(()=>{
            return done(null,{id:row.id,name:row.name})
        })
        } )
    passport.deserializeUser((row,done)=> {
        process.nextTick(()=>{
            return done(null,row)
        })
    }
    )

}

module.exports = init




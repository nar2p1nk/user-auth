const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function init(password,getUserByName){
    const auth = async(name,password,done)=>{
        const user = getUserByName(name)
        if(user == null){
            return done(null,false,{message:'no user found'})
        }
        try{
            if (await bcrypt.compare(password,user.password)){
                return done(null,user)
            }
        }
        catch(e){return done(e)}
    }
}

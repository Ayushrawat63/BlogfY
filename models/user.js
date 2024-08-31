const {Schema ,model} =require('mongoose')
const { createHmac ,randomBytes } = require('crypto');
const { type } = require('os');

const userSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
         type:Buffer    
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
})

userSchema.pre('save',function(next){
    const user=this
    if(!user.isModified("password")) return

    const secret=randomBytes(16).toString()

    const hashed=createHmac('sha256',secret,).update(user.password).digest('hex')

    this.salt=secret
    this.password=hashed

    next();
})

userSchema.static('matchPassword',async function(email,password){
    const user= await this.findOne({email})
    if(!user)  throw new Error("User not found");

    const salt=user.salt;
    const userHashedPassword=user.password;

    const hashedPassword=createHmac('sha256',salt).update(password).digest('hex')

    if(userHashedPassword !== hashedPassword) throw new Error("Incorrect Password");
    return user

})

const User=model('user',userSchema)

module.exports=User;
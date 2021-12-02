const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');


const userSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        mob:
        {
            type: Number,
        },
        email:
        {
            type: String,
            required: true
        },
        roll:
        {
            type: String,
            required: true
        },
        batch_year:
        {
            type: Number
        }
    }
);

userSchema.plugin(passportLocalMongoose);

const User=new mongoose.model('User', userSchema);

module.exports=User;
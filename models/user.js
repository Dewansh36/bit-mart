const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');


const userSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        roll:
        {
            type: String,
            required: true
        },
        articles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'article'
            }
        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'order'
            }
        ],
    }
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User=new mongoose.model('User', userSchema);

module.exports=User;
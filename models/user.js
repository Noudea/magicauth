const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        role : {
            type : String,
            required:true,
            default : 'user'
        }
    },
    { timestamps: true }
)

module.exports =
    mongoose.models.User || mongoose.model('User', UserSchema)

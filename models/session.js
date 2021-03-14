const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema(
    {
        sessionToken: {
            type: String,
            required: true,
        },
        userEmail: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports =
    mongoose.models.Session || mongoose.model('Session', SessionSchema)

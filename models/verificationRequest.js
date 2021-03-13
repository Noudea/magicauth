const mongoose = require('mongoose')

const VerificationRequestSchema = new mongoose.Schema(
    {
        accessToken: {
            type: String,
            required: true,
        },
        sessionToken: {
            type: String,
            required: true,
        },
        identifier: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports =
    mongoose.models.VerificationRequest || mongoose.model('VerificationRequest', VerificationRequestSchema)

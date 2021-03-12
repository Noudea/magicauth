// import nextConnect from 'next-connect'
const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}

// Create cached connection variable
const connection = {}
const DB_URI = process.env.DATABASE_URL

const connectDb = async () => {
    if (connection.isConnected) {
        // use cached connection when available
        console.log('connected to cache database')
        return
    }
    try {
        const dbConnection = await mongoose.connect(DB_URI, options)
        connection.isConnected = dbConnection.connections[0].readyState
        console.log('connected to database')
    } catch (error) {
        console.error(`error connecting to db ${error.message || error}`)
    }
}

export { connectDb }

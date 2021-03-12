import jwt from 'jsonwebtoken'
const loginSecretKey = 'hhQqDlk/Hp+8'


const jwtOptions = {
    issuer: 'magicauth.com',
    audience: 'magicauth.com',
    algorithm: 'HS256',
    expiresIn: '5m',
}

const generateToken =  async (email) => {
    const token =  await jwt.sign({ userEmail: email }, loginSecretKey, jwtOptions)
    return token
}
const verifyToken = async (token) => {
    try {
        const verifyToken = await jwt.verify(token, loginSecretKey, jwtOptions)
        return true
    } catch (error) {
        console.log('decodeToken', error)
        return false
    }
}

const decodeToken = async(token) =>  {
    try {
        const decodedToken = await jwt.verify(token, loginSecretKey, jwtOptions)
        return decodedToken
    } catch (error) {
        return error
    }
}


const jwtOptionsSession = {
    issuer: 'magicauth.com',
    audience: 'magicauth.com',
    algorithm: 'HS256',
    expiresIn: '60d',
}


const generateSessionToken = async (email) => {
    const token =  await jwt.sign({ userEmail: email }, loginSecretKey, jwtOptionsSession)
    return token
}


export { generateToken, decodeToken, verifyToken , generateSessionToken}
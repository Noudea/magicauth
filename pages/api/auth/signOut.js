import Session from '../../../models/session'
import { connectDb } from '../../../services/mongooseDbConnect'
import { decodeToken, verifyToken } from '../../../services/token'


export default async (req, res) => {
    const { method } = req
    connectDb()

    if (method == 'POST') {
        const sessionToken = req.body.sessionToken
        if (sessionToken) {
            const session = await Session.findOneAndDelete({sessionToken : sessionToken})
            if(session) {
                res.status(200).send(session)
            } else {
                res.status(400).send({
                    error :{
                        name : 'invalide session',
                        description : 'could not find and delete session'
                    }
                })
            }
        } else {
            res.status(400).send({
                error : {
                    name : 'invalid token'
                }
            })
        }
    }
}

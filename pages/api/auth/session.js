import Session from "../../../models/session"
import { connectDb } from "../../../services/mongooseDbConnect"
import { decodeToken } from "../../../services/token"

export default async (req, res) => {
    const { method } = req

    connectDb()

    if (method == 'POST') {
        const accessToken = req.body.accessToken
        console.log(accessToken)
        if (accessToken) {
            const session = await Session.findOne({accessToken : accessToken})
            if(session) {
                res.status(200).send({session}) 
            } else {
                res.status(400).send({error: 'no session'})
            }
        }
    }
}
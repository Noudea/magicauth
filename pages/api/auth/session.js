import Session from '../../../models/session'
import { connectDb } from '../../../services/mongooseDbConnect'
import {
    decodeToken,
    generateSessionToken,
    verifyToken,
} from '../../../services/token'

export default async (req, res) => {
    const { method } = req
    connectDb()
    if (method == 'POST') {
        const sessionToken = req.body.sessionToken

        if (sessionToken) {
            verifyToken(sessionToken).then(async (verifiedToken) => {
                if (verifiedToken) {
                    //trouver la session,la modifier(rafraichir le token,date d'expiration) et la renvoyer
                    decodeToken(sessionToken).then(
                        async (decodedSessionToken) => {
                            console.log(decodedSessionToken)
                            const filter = {
                                sessionToken: sessionToken,
                                userEmail: decodedSessionToken.userEmail,
                            }
                            const update = {
                                sessionToken: await generateSessionToken(
                                    decodedSessionToken.userEmail
                                ),
                            }
                            const session = await Session.findOneAndUpdate(
                                filter,
                                update,
                                {
                                    new: true,
                                }
                            )
                            if (session) {
                                res.status(200).send({ session })
                            } else {
                                res.status(400).send({ error: 'no session' })
                            }
                        }
                    )
                }
                if (!verifiedToken) {
                    res.status(400).send({ error: 'invalid Token' })
                }
            })
        }
    }
}

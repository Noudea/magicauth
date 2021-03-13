// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { sendMail } from '../../../services/mail'
import { connectDb } from '../../../services/mongooseDbConnect'
import { generateToken } from '../../../services/token'
import VerificationRequest from "../../../models/verificationRequest"

export default (req, res) => {
    const { method } = req

    connectDb()

    if (method == 'GET') {
        res.status(200).json({ name: 'John Doe' })
    }

    if (method == 'POST') {
        const email = req.body.email
        console.log('user', process.env.EMAIL_USER)
        try {
            //generer un token
            generateToken(email).then((token) => {
                //generer un email et l'envoyer a l'utilisateur
                sendMail(email, token.accessToken)
                // res.status(200).send({
                //     success:true,
                //     data : {token}
                // })
                console.log(token)
                const verificationRequest = new VerificationRequest()
                verificationRequest.accessToken = token.accessToken
                verificationRequest.sessionToken = token.sessionToken
                verificationRequest.identifier = email
                verificationRequest.save((error, verificationRequest) => {
                    // Traitement des erreurs
                    if (error) {
                        return res.status(500).send(error)
                    } else {
                        res.status(200).json({
                            success: true,
                            verificationRequest
                        })
                    }
                })
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({ error })
        }
    }
}

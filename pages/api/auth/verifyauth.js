import session from '../../../models/session'
import Session from '../../../models/session'
import { connectDb } from '../../../services/mongooseDbConnect'
import { decodeToken, verifyToken } from '../../../services/token'


export default (req, res) => {
    const { method } = req
    connectDb()

    if (method == 'GET') {
        const token = req.query.token
        if (token) {
            verifyToken(token).then((verifiedToken) => {
                console.log(verifiedToken)
                if (verifiedToken) {
                    decodeToken(token).then((decodedToken) => {
                        const session = new Session()
                        session.accessToken = token
                        session.userEmail = decodedToken.userEmail
                        session.save((error, session) => {
                            // Traitement des erreurs
                            if (error) {
                                return res.status(500).send(error)
                            } else {
                                console.log(session)
                                res.redirect('/verify')
                                // res.status(200).json({
                                //     success: true,
                                //     data: { session },
                                // })
                            }
                        })
                    })
                }
                if (!verifiedToken) {
                    decodeToken(token).then((decodedToken) => {
                        res.status(400).send({
                            error: decodedToken,
                        })
                    })
                }
            })
            // decodeToken(token).then((decodedToken) => {
            //     console.log('verify auth',decodedToken)
            //     if (decodedToken.userEmail) {
            //         const session = new Session()

            //         session.accessToken = token
            //         session.save((error, session) => {
            //             // Traitement des erreurs
            //             if (error) {
            //                 return res.status(500).send(error)
            //             } else {
            //                 console.log(session)
            //                 res.status(200).json({
            //                     success: true,
            //                     data: { session },
            //                 })
            //             }
            //         })
            //     }
            // })
        }
    }
}

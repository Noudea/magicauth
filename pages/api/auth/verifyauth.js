import Session from '../../../models/session'
import VerificationRequest from '../../../models/verificationRequest'
import { connectDb } from '../../../services/mongooseDbConnect'
import {
    decodeToken,
    generateSessionToken,
    verifyToken,
} from '../../../services/token'

export default (req, res) => {
    const { method } = req
    connectDb()

    if (method == 'GET') {
        const token = req.query.token

        if (token) {
            verifyToken(token).then((verifiedToken) => {
                if (verifiedToken) {
                    //decoder le token et vérifier chercher dans la base de donnée la verification request correspondant au token et a l'identifier
                    decodeToken(token).then(async (decodedToken) => {
                        console.log(decodedToken)
                        const verificationRequest = await VerificationRequest.findOne(
                            {
                                accessToken: token,
                                identifier: decodedToken.userEmail,
                            }
                        )
                        if (verificationRequest) {
                            generateSessionToken(decodedToken.userEmail).then(
                                (sessionToken) => {
                                    const session = new Session()
                                    session.accessToken = token
                                    session.sessionToken = sessionToken
                                    session.userEmail = decodedToken.userEmail
                                    session.save((error, session) => {
                                        // Traitement des erreurs
                                        if (error) {
                                            return res.status(500).send(error)
                                        } else {
                                            res.redirect('/verify')
                                        }
                                    })
                                }
                            )
                        } else {
                            res.status(400).send({
                                error: {
                                    name: 'no verification request in database',
                                },
                            })
                        }
                    })
                }
                if (!verifiedToken) {
                    res.status(400).send({
                        error: {
                            name: 'no valid token',
                        },
                    })
                }
            })
        }
    }
    // if (method == 'GET') {
    //     const token = req.query.token
    //     if (token) {
    //         verifyToken(token).then((verifiedToken) => {
    //             console.log(verifiedToken)
    // if (verifiedToken) {
    //     decodeToken(token).then((decodedToken) => {
    //         generateSessionToken(decodedToken.userEmail).then((sessionToken) => {
    //             const session = new Session()
    //             session.accessToken = token
    //             session.accessToken = sessionToken
    //             session.userEmail = decodedToken.userEmail
    //             session.save((error, session) => {
    //                 // Traitement des erreurs
    //                 if (error) {
    //                     return res.status(500).send(error)
    //                 } else {
    //                     console.log(session)
    //                     res.redirect('/')
    //                 }
    //             })
    //         })
    //     })
    // }
    //             if (!verifiedToken) {
    //                 decodeToken(token).then((decodedToken) => {
    //                     res.status(400).send({
    //                         error: decodedToken,
    //                     })
    //                 })
    //             }
    //         })
    //         // decodeToken(token).then((decodedToken) => {
    //         //     console.log('verify auth',decodedToken)
    //         //     if (decodedToken.userEmail) {
    //         //         const session = new Session()

    //         //         session.accessToken = token
    //         //         session.save((error, session) => {
    //         //             // Traitement des erreurs
    //         //             if (error) {
    //         //                 return res.status(500).send(error)
    //         //             } else {
    //         //                 console.log(session)
    //         //                 res.status(200).json({
    //         //                     success: true,
    //         //                     data: { session },
    //         //                 })
    //         //             }
    //         //         })
    //         //     }
    //         // })
    //     }
    // }
}

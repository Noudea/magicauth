import Session from '../../../models/session'
import User from '../../../models/user'
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
                            const session = new Session()
                            session.sessionToken = decodedToken.sessionToken
                            session.userEmail = decodedToken.userEmail
                            session.save((error, session) => {
                                // Traitement des erreurs
                                if (error) {
                                    return res.status(500).send(error)
                                }
                            })
                            const user = await User.findOne({
                                email: decodedToken.userEmail,
                            })
                            if (user) {
                                res.redirect('/')
                            }
                            if (!user) {
                                const user = new User()
                                user.email = decodedToken.userEmail
                                user.save((error, user) => {
                                    // Traitement des erreurs
                                    if (error) {
                                        return res.status(500).send(error)
                                    } else {
                                        res.redirect('/createProfile')
                                    }
                                })
                            }
                        } else {
                            //pas de vérification request dans la base de donnée
                            res.redirect('/auth/invalidToken')
                            // res.status(400).send({
                            //     error: {
                            //         name: 'no verification request in database',
                            //     },
                            // })
                        }
                    })
                }
                if (!verifiedToken) {
                    //le token n'est plus valide
                    res.redirect('/auth/invalidToken')
                    // res.status(400).send({
                    //     error: {
                    //         name: 'no valid token',
                    //     },
                    // })
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

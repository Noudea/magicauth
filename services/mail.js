import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'SendinBlue',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

const sendMail = async (dest,token) => {
    let info = await transporter.sendMail({
        from: '"MagicApp 👻" <foo@example.com>', // sender address
        to: dest, // list of receivers
        subject: 'Hello ✔', // Subject line
        html: `
            <h1>Magic link 🎩 !</h1>
            <a href="${process.env.NEXTAUTH_URL}/api/auth/verifyauth?token=${encodeURIComponent(
            token
        )}">
            YOUHOU
            </a>
        `
    })

    console.log('Message sent: %s', JSON.stringify(info))
}

export { sendMail }
// module.exports = SendMail = sendMail

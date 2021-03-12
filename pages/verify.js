import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const verify = () => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = window.localStorage.getItem('accessToken')
        console.log(accessToken)

        if (!accessToken) {
            router.push('/signIn')
        }

        if (accessToken) {
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')

            var raw = JSON.stringify({ accessToken: accessToken })

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            }

            fetch('http://localhost:3000/api/auth/session', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    if (result.session) {
                        console.log(result.session)
                        window.localStorage.setItem('sessionToken',result.session.sessionToken)
                        window.localStorage.removeItem('accessToken')
                        router.push('/')
                    }
                    if (result.error) {
                        router.push('/signIn')
                    }
                })
                .catch((error) => console.log('error', error))
        }
    })
    return (
        <>
            <div>
                <p>Verify your email</p>
            </div>
        </>
    )
}

export default verify

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const AuthProvider = ({children}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const sessionToken = window.localStorage.getItem('sessionToken')
        console.log(sessionToken)

        if (!sessionToken) {
            router.push('/signIn')
        }

        if (sessionToken) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({ "sessionToken": sessionToken });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/api/auth/session", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.session) {
                        console.log(result.session)
                        setSignedIn(true)
                    }
                    if(result.error) {
                        router.push('/signIn')
                    }
                })
                .catch(error => console.log('error', error));
        }
        setIsLoaded(true)
    })
    return (<>

    {isLoaded ? <>
            <div>
            {signedIn ? <> <p>I am logged in </p> </> : <> <p>I am not logged in</p></>}
            {children}
        </div>
        </> : <><p>Loader</p></>}
    </>)
}


export default AuthProvider
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const AuthProvider = ({children}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        
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
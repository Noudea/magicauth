import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from '../services/session'

const AuthProvider = ({children}) => {
   const [isLoaded,setIsLoaded] = useState(false)
    const session = useSession()
    console.log(session)
    if(session) {
        if(session) {
            console.log(session.session)
        }
    }
    if(!session) {

    }
    
    useEffect(() => {
        setIsLoaded(true)
    },[])

    return (<>

    {isLoaded ? <>
            <div>
            {session ? <> <p>I am logged in </p> </> : <> <p>I am not logged in</p></>}
            {children}
        </div>
        </> : <><p></p></>}
    </>)
}


export default AuthProvider
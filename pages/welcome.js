import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from '../services/session'

const welcome = () => {
    const [isLoaded,setIsLoaded] = useState(false)
    const session = useSession()
    if(session) {
        if(session.error) {
            console.log(session.error)
        }
        if(session.session) {
            // setIsAuth(true)
            console.log(session.session)
        }
    }
    
    useEffect(() => {
        setIsLoaded(true)
    },[])
    
    // if (error) {
    //     console.log('erreur')
    // }
    
    return(<>
    {isLoaded ? <p>Welcome</p> : <></>}
    </>)
}

export default welcome
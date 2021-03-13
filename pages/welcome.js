import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from '../services/session'

const welcome = () => {
    const [loaded,setloaded] = useState(false)
    const session = useSession()
    useEffect(() => {
        setloaded(true)
    },[])

    if(session) {
        if(session.error) {
            console.log(session.error)
        }
        if(session.session) {
            console.log(session.session)
        }
    }
    // if (error) {
    //     console.log('erreur')
    // }
    
    return(<>
        <p>Welcome</p>
    </>)
}

export default welcome
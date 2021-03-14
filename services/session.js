import { useRouter } from 'next/router'
import {useState , useEffect} from 'react'
import { connectDb } from './mongooseDbConnect'

const useSession = () => {
    const [session,SetSession] = useState(false)
    const router = useRouter()
    connectDb()
    useEffect(() => {
        var axios = require('axios');
        var data = JSON.stringify({"sessionToken": window.localStorage.getItem('sessionToken')});

        var config = {
        method: 'post',
        url: 'http://localhost:3000/api/auth/session',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            SetSession(response.data)
            window.localStorage.setItem('sessionToken',response.data.session.sessionToken)
        })
        .catch(function (error) {
            //window.localStorage.removeItem('sessionToken')
            // SetSession({error : {
            //     name : "no session"
            // }})
            SetSession(false)
            //router.push('/signIn')
        });
    },[])
    if(session) {
        return session
    }
}

export {useSession}
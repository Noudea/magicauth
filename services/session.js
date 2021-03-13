import {useState , useEffect} from 'react'
import { connectDb } from './mongooseDbConnect'

const useSession = () => {
    const [session,SetSession] = useState(false)
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
            console.log(response)
            SetSession(response.data)
        })
        .catch(function (error) {
            console.log(error);
            SetSession({error : {
                name : "no session"
            }})
        });
    },[])
    if(session) {
        return session
    }
}

export {useSession}
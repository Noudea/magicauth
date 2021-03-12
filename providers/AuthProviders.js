import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const verify = () => {
    const [signedIn, setSignedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const accessToken = window.localStorage.getItem('accessToken')
        console.log(accessToken)

        if (!accessToken) {
            router.push('/signIn')
        }


        if (accessToken) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({ "accessToken": accessToken });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/api/auth/session", requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
    })


    return (<>
        <div>


        </div>


    </>)
}


export default verify
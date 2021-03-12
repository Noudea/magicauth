import { useRouter } from 'next/router'


const signIn = () => {
    const router = useRouter()


    const SubmitMail = (e) => {
        e.preventDefault()
        console.log('submit')
        const email = document.getElementById('email')
        console.log(email.value)
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let body = JSON.stringify({ "email": email.value });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/auth/signIn", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                window.localStorage.setItem('accessToken', result.verificationRequest.accessToken)
                //router.push('/verify')
            })
            .catch(error => console.log('error', error));
    }

    return(<>
        <form onSubmit={SubmitMail}>
            <input id='email' type='text'></input>
            <button type='submit'>Submit</button>
        </form>
    </>)
}

export default signIn
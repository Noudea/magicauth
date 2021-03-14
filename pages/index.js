import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import AuthProvider from '../providers/AuthProviders'
import {useEffect} from 'react'

export default function Home() {
    
    useEffect(() => {
        
    })
    return (
        <AuthProvider>
            <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1>MAIN</h1>
            </main>
            </div>
        </AuthProvider>
    )
}

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'


export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <h1>MAIN</h1>
      </main>
    </div>
  )
}

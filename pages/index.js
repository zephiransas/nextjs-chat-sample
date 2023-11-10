import Head from 'next/head';
import ChatBox from '../components/chat-box'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Chat App Demo with NextJS</title>
      </Head>
      <main>
        <h1 className="title">Next.js Chat Demo</h1>
        <ChatBox/>
      </main>
      <footer>
      </footer>
    </div>
  )
}
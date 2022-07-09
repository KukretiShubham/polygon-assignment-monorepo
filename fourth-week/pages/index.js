import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Post from '../components/post'
import Navbar from '../components/Global/navbar'
export default function Home() {
  return (
    <div>
      <Navbar/>
      <Post/>
    </div>
  )
}

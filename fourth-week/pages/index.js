import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Post from '../components/post'
import Navbar from '../components/Global/navbar'
import Card from '../components/cards'
export default function Home() {
  return (
    <div>
      <Navbar/>
      <Post/>
      <Card/>
    </div>
  )
}

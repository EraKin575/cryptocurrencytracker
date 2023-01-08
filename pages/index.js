import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Example from './components/Example'
import CryptoPrices from './components/CryptoPrices'

const inter = Inter({ subsets: ['latin'] })

const style={
  background:'justify-center'
}
export default function Home() {
  return (
    <div className={style.background}>
      <CryptoPrices/>

     
    </div>
  )
}

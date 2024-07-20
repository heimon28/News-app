import { useState } from 'react'

import viteLogo from '/favicon.ico'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import {Outlet} from 'react-router-dom'

function App() {
 

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App

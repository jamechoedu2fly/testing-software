import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import  "../styles/HomeStyle.css"
import jamechoLogo from "../styles/jamecho-logo.jpeg"
const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <Layout>
      <div className="home-card">
      <h1 className='Home-heading'>Home</h1>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      {/* <h2>Welcome  {auth?.user?.name}</h2> */}
      {/* <h2>{auth?.user?.role}</h2> */}
      <img src={jamechoLogo} alt='jamecho-logo'/>
      </div>
    </Layout>
  )
}

export default HomePage
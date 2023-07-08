import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import  "../styles/HomeStyle.css"
const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <Layout>
      <div className="home-card">
      <h1 className='Home-heading'>Home</h1>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      {/* <h2>Welcome  {auth?.user?.name}</h2> */}
      {/* <h2>{auth?.user?.role}</h2> */}
      </div>
    </Layout>
  )
}

export default HomePage
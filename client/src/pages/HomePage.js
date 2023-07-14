import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import "../styles/HomeStyle.css"
import capLogo from "../styles/cap-grad.png"

const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <Layout>
      <div className="home-container">
        <div className="content">
          <div className="heading-container">
            <h1 className="heading large-heading">
              Jamecho's
            </h1>
          </div>
          <h1 className="heading large-heading">TalentAsses Test</h1>
        </div>
        <img src={capLogo} alt="cap-logo" className="image"/>
      </div>
    </Layout>
  )
}

export default HomePage

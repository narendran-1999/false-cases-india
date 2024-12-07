import React from 'react'
import './Sidebar.css'
import SharePage from './SharePage'

const Sidebar = () => {
  return (
    <div className="sidebar">

        <div>
            <h5>NAVIGATION</h5>
            <a href="#intro">Introduction</a>
            <a href="#fake-2022">Fake Cases in 2022</a>
            <a href="#fake-trend">2016 - 2022 Trend</a>
            <a href="#methodology">How is estimation done?</a>
            <a href="#faq">Frequently Asked Questions</a>
            <a href="#verify-data">Data and References</a>
        </div>

        <SharePage />
        
    </div>
  )
}

export default Sidebar
import React, { useState } from 'react'
import './Sidebar.css'
import SharePage from './SharePage'
import togglenav from './imgs/toggle-nav.png'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

const Sidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false)

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive)
  }
  
  return (
    <>
      <div className={ `sidebar ${ sidebarActive ? "" : "hidden" }` }>
        <div>
            <h5>NAVIGATION</h5>

            <SharePage />

            <div className="toggle" onClick={ toggleSidebar }>
              <div className="toggle-inner">
                <img src={ togglenav } width={15}/>

                {
                  sidebarActive
                  ? <FaAngleDoubleLeft color='white' size={15}/>
                  : <FaAngleDoubleRight color='white' size={15}/>
                }
              </div>
            </div>

            <a href="#intro">Introduction</a>
            <a href="#fake-2022">Fake Cases in 2022</a>
            <a href="#fake-trend">2016-22 Trend</a>
            <a href="#fake-2022-metro">Metro Cities 2022</a>
            <a href="#fake-trend-metro">Metro Cities 2016-22</a>
            <a href="#methodology">How is estimation done?</a>
            <a href="#faq">Frequently Asked Questions</a>
            <a href="#verify-data">Data and References</a>
        </div>
      </div>

      <div className={ `sidebar-bg ${ sidebarActive ? "" : "hidden" }` }  onClick={ toggleSidebar }>
      </div>
    </>
  )
}

export default Sidebar
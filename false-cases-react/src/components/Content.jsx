import React from 'react'
import './Content.css'
import DataVisIndia from './DataVis/DataVisIndia'
import DataVisMetro from './DataVis/DataVisMetro'
import Explanation from './Explanation/Explanation'

const Content = () => {
  return (
    <div className='content'>
      <div className='container'>
        
      <div id="intro">
        <h1>Misuse of Indian Law by Women</h1>
        <h3>Analysis of Fake Cases</h3>
      </div>
      
      <div className="intro-text">
        <p><span className="red">False accusations</span> on men often lead to <span className="red">immediate arrest</span> and prolonged <span className="red">time in custody (jail)</span>, with little regard for the damage caused to their lives. 
          These men are deprived of their freedom, forced to endure the social stigma, and stripped of their dignity, all while waiting for relief from legal burden, which can take anywhere from weeks to years. 
          The <span className="red">emotional and psychological toll</span> is immense, some tragically even <span className="red">resorting to suicide.</span></p>

        <p>
          <span className="red">The women who falsely accuse men</span>, often for <span className="red">extortion, blackmail, revenge, and covering up their misconduct</span>, exploit the justice system for their own ends.
        </p><br/>
        
        <h5><b>ANALYSIS</b></h5>
        <p>This analysis aims to unveil the <span className="red">alarming prevalence of fake cases</span>, which are often overlooked due to being <span className="red">hidden behind the legal process</span> or actively diminished to downplay the issue of false accusations.</p>
        <p>
          The four criminal cases this analysis covers are <span className="red">non-bailable. </span>
          The accused is immediately arrested and placed in custody without preliminary investigation (except for cruelty cases since 2017). 
          Such accusations are abused extensively by women.
        </p>

        <p><span className="red">Estimation is used to provide a perspective that’s closer to ground reality.</span></p>
      </div>

      <DataVisIndia />

      <DataVisMetro />

      <Explanation />

      </div>
    </div>
  )
}

export default Content
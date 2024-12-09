import React from 'react'
import './Content.css'
import PieImgs from './PieImgs/PieImgs'
import CasesCharts from './AreaCharts/CasesCharts'
import PercentCharts from './AreaCharts/PercentCharts'
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
          The <span className="red">emotional and psychological toll</span> is immense, some tragically even <span className="red">resorting to suicide</span> as a result of the overwhelming pressure and hopelessness.</p>

        <p><span className="red">The women who falsely accuse men</span>, often for <span className="red">extortion, blackmail, revenge, and covering up their misconduct</span>, exploit the justice system for their own ends. 
          These women not only destroy innocent lives but also erode trust in the very system designed to protect them. 
          Consequences for false accusers should be as severe as those for the men wrongfully accused, to deter the abuse of the justice system.</p><br/>
        
        <h5><b>ANALYSIS</b></h5>
        <p>This analysis aims to unveil the <span className="red">alarming prevalence of fake cases</span>, which are often overlooked due to being <span className="red">hidden behind the legal process</span> or, at times, actively diminished to downplay the issue of false accusations.</p>
        <p>The four criminal cases this analysis covers are <span className="red">non-bailable.</span> 
          The accused is immediately arrested and put in custody and is <span className="red">not released till at least the woman's case is weak</span> due to inconsistencies or insufficient evidence. 
          Such accusations are abused extensively by women.</p>
        <p><span className="red">Estimation is used to provide a perspective that’s closer to ground reality.</span></p>
      </div>

      <h1 className="red" id="fake-2022">FAKE CASES IN 2022</h1>

      <div className="section-p"> 
        Among all cases concluded under four crimes in <span className="red">2022</span>,<br/>
        <ul>
        <li><span className="red">63.7%</span> have been found to be fake cases (the crime reported did not happen).</li>
        <li>Among those fake cases, <span className="red">69.5%</span> were confirmed to be made <span className="red">with malicious intention.</span></li>
        </ul>
      </div>

      <PieImgs />

      <h1 className="red" id="fake-trend">FAKE CASES 2016 - 2022</h1>

      <div className="section-p">
        <h5><b>NUMBER OF CASES</b></h5>
        <p>
          The number of <span className="red">fake cases</span> have been <span className="red">increasing consistently</span>, except for the <span className="red">slight decrease in 2020</span> due to COVID-19 lockdown impeding police investigation process, thereby less final reports getting filed.
        </p>
      </div>

      <h6 className="trends-head">
        <b>NUMBER OF FAKE CASES EACH YEAR</b><br/>
        <i>(Interactive charts - hover to see details)</i>
      </h6>

      <CasesCharts />

      <div className="section-p">
        <h5><b>PREVALENCE OF CASES</b></h5>
        <p>
          Prevalence of fake cases has consistently been <span className="red">above 50% from 2020.</span> 
          Moreover, fake cases under <span className="red">‘Attempted Rape’</span> and <span className="red">‘Cruelty by Husband or His Relatives’</span> (the infamous 498A) have been <span className="red">above 60% since 2016 at least.</span>
        </p>
      </div>

      <h6 className="trends-head">
        <b>PREVALENCE OF FAKE CASES EACH YEAR (%)</b><br/>
        <i>(Interactive charts - hover to see details)</i>
      </h6>

      <PercentCharts />

      <Explanation />

      </div>
    </div>
  )
}

export default Content
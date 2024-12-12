import React from 'react'
import './DataVis.css'
import PieImgs from './PieImgs/PieImgs'
import ChartsGrid from '../AreaCharts/ChartsGrid'

const DataVisMetro = () => {
    
    return (
        <>
            <h1 className="red" id="fake-2022-metro">
                FAKE CASES IN METRO CITIES 2022<br/>
                <small>(Cities with 2 million+ population)</small>
            </h1>
    
            <div className="section-p">
                Among all cases concluded under four crimes in <span className="red">2022</span>,<br/>
                <ul>
                    <li><span className="red">63.7%</span> have been found to be fake cases (the crime reported did not happen).</li>
                    <li>Among those fake cases, <span className="red">69.5%</span> were confirmed to be made <span className="red">with malicious intention.</span></li>
                </ul>
            </div>
    
            <PieImgs isMetro={true}/>

            <p className='redbox'><span className='red'>NOTE:</span> 'Confirmed Malicious' is the MINIMUM proportion of intentional fake cases</p>
    
            <h1 className="red" id="fake-trend-metro">
                FAKE CASES IN METRO CITIES 2016-2022<br/>
                <small>(Cities with 2 million+ population)</small>
            </h1>
    
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
    
            <ChartsGrid isMetro={true} type="number"/>
    
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
    
            <ChartsGrid isMetro={true} type="percent"/>
        </>
    )
    
}

export default DataVisMetro
import React, { lazy } from 'react'
import './DataVis.css'
import RedBox from './RedBox'

const PieImgs = lazy( () => import('./PieImgs/PieImgs') )
const ChartsGrid = lazy( () => import('../AreaCharts/ChartsGrid') )

const DataVisIndia = () => {
    
    return (
        <>
            <h1 className="red" id="fake-2022">FAKE CASES IN 2022</h1>

            <RedBox />
    
            <PieImgs isMetro={false}/>
    
            <h1 className="red" id="fake-trend">FAKE CASES 2016 - 2022</h1>
    
            <div className="section-p">
            <h5><b>NUMBER OF CASES (QUASHED CASES INCLUDED)</b></h5>
            <p>
                The number of <span className="red">fake cases</span> have been <span className="red">increasing consistently</span>, except for the <span className="red">slight decrease in 2020</span> due to COVID-19 lockdown impeding police investigation process, thereby less final reports getting filed.
            </p>
            </div>
    
            <h6 className="trends-head">
                <b>NUMBER OF FAKE CASES EACH YEAR</b><br/>
                <i>(Interactive charts - hover to see details)</i>
            </h6>
    
            <ChartsGrid isMetro={false} type="number"/>
    
            <div className="section-p">
                <h5><b>ESTIMATE PERCENTAGE OF CASES</b></h5>
                <p>
                    Percentage of fake cases has been <span className="red">above 50% from 2020. </span> 
                    Moreover, fake cases under <span className="red">‘Attempted Rape’</span> and <span className="red">‘Cruelty by Husband or His Relatives’</span> (the infamous 498A) have been <span className="red">above 60% since 2016 at least. </span>
                </p>
            </div>
    
            <h6 className="trends-head">
                <b>PERCENTAGE OF FAKE CASES EACH YEAR (%)</b><br/>
                <i>(Interactive charts - hover to see details)</i>
            </h6>
    
            <ChartsGrid isMetro={false} type="percent"/>
        </>
    )
}

export default DataVisIndia
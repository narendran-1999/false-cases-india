import React from 'react'
import './DataVis.css'
import PieImgs from './PieImgs/PieImgs'
import ChartsGrid from '../AreaCharts/ChartsGrid'
import RedBox from './RedBox'
import CitiesList from '../CitiesList/CitiesList'

const DataVisMetro = () => {
    
    return (
        <>
            <h1 className="red" id="fake-2022-metro">
                FAKE CASES IN METRO CITIES 2022<br/>
                <small>(Cities with 2 million+ population)</small>
            </h1>

            <CitiesList />
    
            <RedBox />
    
            <PieImgs isMetro={true}/>
    
            <h1 className="red" id="fake-trend-metro">
                FAKE CASES IN METRO CITIES 2016-2022<br/>
                <small>(Cities with 2 million+ population)</small>
            </h1>
    
            <div className="section-p">
                <h5><b>NUMBER OF CASES (QUASHED CASES INCLUDED)</b></h5>
                <p>
                    Similar to all-India data, the general trend is upward between 2016 and 2022. 
                    But there are differences in pattern:
                </p>
                <ul>
                    <li>Decline in number of fake rape cases in 2017</li>
                    <li>More pronounced decline in fake sexual assault and cruelty cases in 2020</li>
                    <li>Steep increase in fake cruelty cases in 2022</li>
                    <li>Pattern in fake attempted rape cases fluctuate more due to low numbers</li>
                </ul>
            </div>
    
            <h6 className="trends-head">
                <b>NUMBER OF FAKE CASES EACH YEAR</b><br/>
                <i>(Interactive charts - hover to see details)</i>
            </h6>
    
            <ChartsGrid isMetro={true} type="number"/>
    
            <div className="section-p">
                <h5><b>ESTIMATE PERCENTAGE OF CASES</b></h5>
                <p>
                    There's a general <span className="red">upward trend</span> in fake cases between 2016 and 2022, <span className="red">except for cruelty cases.</span>
                </p>
                <p>
                    Estimate for attempted rape in the listed metro cities has lower accuracy compared to other cases due to very low numbers reaching conclusive resolution.
                </p>

                <p>
                    In <span className="red">cruelty</span> case estimates, there's a <span className="red">higher proportion of 'unconfirmed malicious'</span> (light red) than in raw numbers due to <span className="red">high number of cruelty cases getting quashed each year. </span>
                    Quashed cases are not included in estimation.
                </p>
            </div>
    
            <h6 className="trends-head">
                <b>PERCENTAGE OF FAKE CASES EACH YEAR (%)</b><br/>
                <i>(Interactive charts - hover to see details)</i>
            </h6>
    
            <ChartsGrid isMetro={true} type="percent"/>
        </>
    )
    
}

export default DataVisMetro
import React from 'react'
import './DataVis.css'
import PieImgs from './PieImgs/PieImgs'
import ChartsGrid from '../AreaCharts/ChartsGrid'
import RedBox from './RedBox'

const DataVisMetro = () => {
    
    return (
        <>
            <h1 className="red" id="fake-2022-metro">
                FAKE CASES IN METRO CITIES 2022<br/>
                <small>(Cities with 2 million+ population)</small>
            </h1>
    
            <RedBox />
    
            <PieImgs isMetro={true}/>
    
            <h1 className="red" id="fake-trend-metro">
                FAKE CASES IN METRO CITIES 2016-2022<br/>
                <small>(Cities with 2 million+ population)</small>
            </h1>
    
            <div className="section-p">
                <h5><b>NUMBER OF CASES</b></h5>
                <p>
                    
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
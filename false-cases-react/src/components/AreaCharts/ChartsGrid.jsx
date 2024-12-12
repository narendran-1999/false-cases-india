import React from 'react'
import AreaChart from './AreaChart'

const ChartsGrid = ({ isMetro, type }) => {

  return (
    <div className="graphs">
        <div className="row">
          <AreaChart crime="rape" isMetro={isMetro} type={type}/>
          <AreaChart crime="attempted_rape" isMetro={isMetro} type={type}/>
        </div>
        <div className="row">
          <AreaChart crime="sexual_assault" isMetro={isMetro} type={type}/>
          <AreaChart crime="cruelty" isMetro={isMetro} type={type}/>
        </div>
    </div>
  )
}

export default ChartsGrid
import React from 'react'
import './Content.css'
import AreaChart from './AreaChart'
import Explanation from './Explanation/Explanation'

const Content = () => {
  return (
    <div className='content'>
      <div className='container'>
        <Explanation />
      </div>
    </div>
  )
}

export default Content
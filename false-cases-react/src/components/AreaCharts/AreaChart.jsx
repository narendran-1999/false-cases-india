import React from 'react'
import getCrimeData from '../../data/get-data'

const AreaChart = ({ isMetro, type, crime }) => {
  const { data, title } = getCrimeData(crime, isMetro)

  console.log(data, title)
  
  return (
    <div className='col-md-12 col-lg-6'>
      
    </div>
  )
}

export default AreaChart
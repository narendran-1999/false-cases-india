import React from 'react'

const RedBox = () => {
  return (
    <div className='redbox'>
        <span className='red'>NOTE:</span>
        <ul>
            <li>'Confirmed Malicious' (dark red) is the MINIMUM proportion of intentional fake cases</li>
            <li>Proportion of intentionally filed cases in bright red is unknown</li>
        </ul>
        <i>Refer "How is estimation done?" for details</i>
    </div>
  )
}

export default RedBox
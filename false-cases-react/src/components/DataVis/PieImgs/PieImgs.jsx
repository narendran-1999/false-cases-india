import React from 'react'
import './PieImgs.css'

import cruelty_pie from './india-imgs/cruelty_pie.png'
import rape_pie from './india-imgs/rape_pie.png'
import att_rape_pie from './india-imgs/att_rape_pie.png'
import sa_pie from './india-imgs/sa_pie.png'

import cruelty_pie_metro from './metro-imgs/cruelty_pie.png'
import rape_pie_metro from './metro-imgs/rape_pie.png'
import att_rape_pie_metro from './metro-imgs/att_rape_pie.png'
import sa_pie_metro from './metro-imgs/sa_pie.png'


const indiaPies = [ rape_pie, att_rape_pie, sa_pie, cruelty_pie ]
const metroPies = [ rape_pie_metro, att_rape_pie_metro, sa_pie_metro, cruelty_pie_metro ]

const PieImgs = ({isMetro}) => {
  const pieArray = isMetro ? metroPies : indiaPies
  
  return (
    <div className="pie-imgs">
        <div className="row">
          <img src={ pieArray[0] } className="col-md-6 col-sm-12" loading='lazy'/>
          <img src={ pieArray[1] } className="col-md-6 col-sm-12" loading='lazy'/>
        </div>

        <div className="row">
          <img src={ pieArray[2] } className="col-md-6 col-sm-12" loading='lazy'/>
          <img src={ pieArray[3] } className="col-md-6 col-sm-12" loading='lazy'/>
        </div>
    </div>
  )
}

export default PieImgs
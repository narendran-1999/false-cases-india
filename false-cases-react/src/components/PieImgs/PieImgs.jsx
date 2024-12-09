import React from 'react'
import './PieImgs.css'
import cruelty_pie from './imgs/cruelty_pie.png'
import rape_pie from './imgs/rape_pie.png'
import att_rape_pie from './imgs/att_rape_pie.png'
import sa_pie from './imgs/sa_pie.png'

const PieImgs = () => {
  return (
    <div className="pie-imgs">
        <div className="row">
          <img src={rape_pie} className="col-md-6 col-sm-12"/>
          <img src={att_rape_pie} className="col-md-6 col-sm-12"/>
        </div>
        <div className="row">
          <img src={sa_pie} className="col-md-6 col-sm-12"/>
          <img src={cruelty_pie} className="col-md-6 col-sm-12"/>
        </div>
    </div>
  )
}

export default PieImgs
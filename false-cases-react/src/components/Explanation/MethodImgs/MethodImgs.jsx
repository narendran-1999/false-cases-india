import React from 'react'
import './MethodImgs.css'
import method1 from './imgs/method1.png'
import method2 from './imgs/method2.png'
import method3 from './imgs/method3.png'

const MethodImgs = () => {
  return (
    <div className="image-gallery row">
        <div className="col-lg-4 col-md-12">
            <div className="image-item">
                <img src={method1} alt="Image 1" className="img-fluid rounded" loading='lazy'/>
            </div>
        </div>
        <div className="col-lg-4 col-md-12">
            <div className="image-item">
                <img src={method2} alt="Image 2" className="img-fluid rounded" loading='lazy'/>
            </div>
        </div>
        <div className="col-lg-4 col-md-12">
            <div className="image-item">
                <img src={method3} alt="Image 3" className="img-fluid rounded" loading='lazy'/>
            </div>
        </div>
    </div>
  )
}

export default MethodImgs
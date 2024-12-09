import React from 'react'
import './MethodImgs.css'

const MethodImgs = () => {
  return (
    <div className="image-gallery row">
        <div className="col-md-4">
            <div className="image-item">
                <img src="page-assets/imgs/method1.png" alt="Image 1" className="img-fluid rounded" data-bs-toggle="modal" data-bs-target="#lightboxModal"/>
            </div>
        </div>
        <div className="col-md-4">
            <div className="image-item">
                <img src="page-assets/imgs/method2.png" alt="Image 2" className="img-fluid rounded" data-bs-toggle="modal" data-bs-target="#lightboxModal"/>
            </div>
        </div>
        <div className="col-md-4">
            <div className="image-item">
                <img src="page-assets/imgs/method3.png" alt="Image 3" className="img-fluid rounded" data-bs-toggle="modal" data-bs-target="#lightboxModal"/>
            </div>
        </div>
    </div>
  )
}

export default MethodImgs
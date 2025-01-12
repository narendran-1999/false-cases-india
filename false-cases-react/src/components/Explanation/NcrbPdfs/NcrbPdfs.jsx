import React, { useState, lazy } from 'react'
import './NcrbPdfs.css'
import { FaBookOpen } from 'react-icons/fa'

// Lazy-load NCRB PDFs popup
const NcrbPopup = lazy( () => import('./NcrbPopup/NcrbPopup') )

const NcrbPdfs = () => {
    const [showNcrbPopup, setShowNcrbPopup] = useState(false)

    return (
        <>
            <div className="ncrb-button">
                <button className="btn btn-danger" onClick={() => setShowNcrbPopup(true)}>
                    <FaBookOpen className="open-popup-icon" size={23} />
                    Direct PDF Links
                </button>
            </div>
            
            {
                showNcrbPopup &&
                <NcrbPopup close={ () => setShowNcrbPopup(false) }/>
            }
        </>
    )
}

export default NcrbPdfs
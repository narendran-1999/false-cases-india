import React, { useState } from 'react'
import './NcrbPdfs.css'
import { FaBookOpen } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'
import pdfUrls from '../../../data/ncrb-pdf-urls'

const NcrbPdfs = () => {
    const [showNcrbPopup, setShowNcrbPopup] = useState(false)

    return (
        <>
            <div className="ncrb-button">
                <button className="btn btn-danger" onClick={() => setShowNcrbPopup(true)}>
                    Direct PDF Links
                    <FaBookOpen className="open-popup-icon" size={23} />
                </button>
            </div>
            
            {
                showNcrbPopup &&

                <div className="ncrb-popup-bg">
                    <div className="ncrb-popup">
                        <div className="btn-container">
                            <button className="btn btn-danger" onClick={() => setShowNcrbPopup(false)}>Close</button>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Pages (in print)</th>
                                    <th>Official PDF</th>
                                    <th>Backup (Only Ch.3)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.entries(pdfUrls).map(([year, { url, pages }]) => (
                                        <tr key={year}>
                                            <td>{year}</td>
                                            <td>{pages}</td>
                                            <td>
                                                <a className="pdf-link" href={url} target="_blank" rel="noopener noreferrer">
                                                    Open <MdOpenInNew className="open-pdf-icon" size={20}/>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}

export default NcrbPdfs
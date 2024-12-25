import React, { useState } from 'react'
import './NcrbPdfs.css'
import pdfUrls from '../../../data/ncrb-pdf-urls'

const NcrbPdfs = () => {
    const [showNcrbPopup, setShowNcrbPopup] = useState(false)

    return (
        <>
            <div className="ncrb-button">
                <button className="btn btn-primary" onClick={() => setShowNcrbPopup(true)}>Direct PDF Links &gt;&gt;</button>
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
                                    <th>PDF URL</th>
                                    <th>Relevant Pages</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.entries(pdfUrls).map(([year, { url, pages }]) => (
                                        <tr key={year}>
                                            <td>{year}</td>
                                            <td><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></td>
                                            <td>{pages}</td>
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
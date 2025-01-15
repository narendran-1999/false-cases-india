import React from 'react'
import { MdOpenInNew } from 'react-icons/md'
import pdfUrls from '../../../../data/ncrb-pdf-urls'

const NcrbPopup = ({ close }) => {
    return (
        <div className="ncrb-popup-bg">
            <div className="ncrb-popup">
                <div className="btn-container">
                    <button className="btn btn-danger" onClick={ close }>Close</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Pages (in print)</th>
                            <th>Official Docs</th>
                            <th>Relevant pages only (backup)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Object.entries(pdfUrls).map(([year, { url, bkp_url, pages }]) => (
                                <tr key={year}>
                                    <td>{year}</td>

                                    <td className='pages-container'>
                                        {
                                            pages.split(',').map((page, index) => (
                                                <div key={index} className='pdf-page'>{page}</div>
                                            ))
                                        }
                                    </td>

                                    <td>
                                        <a className="pdf-link" href={url} target="_blank" rel="noopener noreferrer">
                                            Open <MdOpenInNew className="open-pdf-icon" size={20}/>
                                        </a>
                                    </td>

                                    {
                                        bkp_url &&
                                        <td rowSpan={7} className='backup-link-cell'>
                                            <a className="pdf-link" href={bkp_url} target="_blank" rel="noopener noreferrer">
                                                Open <MdOpenInNew className="open-pdf-icon" size={20}/>
                                            </a>
                                        </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NcrbPopup
import React, { useState, lazy } from 'react'
import './DataTabs.css'

// Lazy-load DataTable popup
const DataTable = lazy( () => import('./DataTables') )

const makeTabs = ( isMetro, openPopup ) => {

    return (
            <div className='col-md-6'>
                <div className="table-head">
                    {isMetro ? "METRO CITIES" : "ALL INDIA"}
                </div>

                <ul className="nav nav-tabs">
                    <li>
                        <button className="nav-link" onClick={ () => openPopup(isMetro, "rape") }>
                            Rape
                        </button>
                    </li>

                    <li>
                        <button className="nav-link" onClick={ () => openPopup(isMetro, "attempted_rape") }>
                            Attempted Rape
                        </button>
                    </li>

                    <li>
                        <button className="nav-link" onClick={ () => openPopup(isMetro, "sexual_assault") }>
                            Sexual Harassment/Assault<br/>
                            <small>(Assault on Women with Intent to Outrage Modesty)</small>
                        </button>
                    </li>

                    <li>
                        <button className="nav-link"  onClick={ () => openPopup(isMetro, "cruelty") }>
                            Cruelty by Husband or His Relatives
                        </button>
                    </li>
                </ul>
            </div>
    )
}

const DataTabs = () => {
    const [showPopup, setShowPopup] = useState(false)

    const [popupData, setPopupData] = useState({
        isMetro: false,
        crime: "rape"
    })

    const openPopup = (isMetro, crime) => {
        setPopupData({
            isMetro: isMetro,
            crime: crime
        })
        setShowPopup(true)
    }

    const closePopup = () => {
        setShowPopup(false)
    }
  
    return (
    <>
        <div className='tabs-container'>
            <div className="row">

                { makeTabs(false, openPopup) }
                { makeTabs(true, openPopup) }

            </div>
        </div>

        {
            showPopup &&
            <DataTable data={popupData} closePopup={closePopup}/>
        }
    </>
  )
}

export default DataTabs
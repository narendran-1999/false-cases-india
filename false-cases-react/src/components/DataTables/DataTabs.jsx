import React from 'react'
import './DataTabs.css'
import openTable from './DataTables'

const makeTabs = (isMetro) => {

    return (
            <div className='col-md-6'>
                <div className="table-head">
                    {isMetro ? "METRO CITIES" : "ALL INDIA"}
                </div>

                <ul className="nav nav-tabs">
                    <li>
                        <button className="nav-link" onClick={ () => openTable(isMetro, "rape") }>
                            Rape
                        </button>
                    </li>

                    <li>
                        <button className="nav-link" onClick={ () => openTable(isMetro, "attempted_rape") }>
                            Attempted Rape
                        </button>
                    </li>

                    <li>
                        <button className="nav-link" onClick={ () => openTable(isMetro, "sexual_assault") }>
                            Sexual Harassment/Assault<br/>
                            <small>(Assault on Women with Intent to Outrage Modesty)</small>
                        </button>
                    </li>

                    <li>
                        <button className="nav-link"  onClick={ () => openTable(isMetro, "cruelty") }>
                            Cruelty by Husband or His Relatives
                        </button>
                    </li>
                </ul>
            </div>
    )
}

const DataTabs = () => {
  return (
    <div className='tabs-container'>
        <div className="row">

            {makeTabs(false)}
            {makeTabs(true)}

        </div>
    </div>
  )
}

export default DataTabs
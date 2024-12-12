import React from 'react'
import './DataTables.css'
import getCrimeData from '../../data/get-data'

const DataTables = () => {
  return (
    <div className="tabs-container">

      <ul className="nav nav-tabs" id="dataTablesTabs" role="tablist">
        <li className="nav-item">
          <button className="nav-link active" id="rape-tab" data-bs-toggle="tab" data-csv="rape" type="button" role="tab" aria-selected="true">Rape</button>
        </li>
        <li className="nav-item">
          <button className="nav-link" id="attempted-rape-tab" data-bs-toggle="tab" data-csv="attempted_rape" type="button" role="tab" aria-selected="false">Attempted Rape</button>
        </li>
        <li className="nav-item">
          <button className="nav-link" id="sexual-harassment-tab" data-bs-toggle="tab" data-csv="sexual_assault" type="button" role="tab" aria-selected="false">Sexual Harassment/Assault<br/>
          <small>(Assault on Women with Intent to Outrage Modesty)</small></button>
        </li>
        <li className="nav-item">
          <button className="nav-link" id="cruelty-tab" data-bs-toggle="tab" data-csv="cruelty" type="button" role="tab" aria-selected="false">Cruelty by Husband or His Relatives</button>
        </li>
      </ul>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>FR Non-Cognizable</th>
              <th>Final Report False</th>
              <th>Mistake of Fact or Law or Civil Dispute</th>
              <th>Convicted</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DataTables
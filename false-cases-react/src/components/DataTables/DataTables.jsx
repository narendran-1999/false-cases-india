import React from 'react'
import './DataTables.css'
import getCrimeData from '../../data/get-data'

const makeTable = (data) => {
  
  // Make table body from a number array
  return data.map((row, rowIndex) => (

    <tr key={rowIndex}>
      {
        row.map((cell, cellIndex) => (
          <td key={cellIndex}>{cell}</td>
        ))
      }
    </tr>

  ))

}

const DataTable = ({ data: { isMetro, crime }, closePopup }) => {
  const { data, title } = getCrimeData(crime, isMetro)
  const tabletitle = (
    title + (isMetro ? " - METRO CITIES" : " - ALL INDIA")
  ).toUpperCase()

  return (
    <div className="modal-container">
      <div className="table-container">
        <h3>{ tabletitle.toUpperCase() }</h3>

        <table>
          <thead>
            <tr>
              <th rowspan="2">Year</th>
              <th rowspan="2">FR Non-Cognizable</th>
              <th rowspan="2">Final Report False</th>
              <th rowspan="2">Mistake of Fact or Law or Civil Dispute</th>
              <th colspan="2">Quashed</th>
              <th rowspan="2">Convicted</th>
            </tr>

            <tr>
              <th>In Investigation Stage</th>
              <th>In Trial Stage</th>
            </tr>
          </thead>

          <tbody>
            { makeTable(data) }
          </tbody>
        </table>

        <div className="btn-container">
          <button className="btn btn-danger" onClick={closePopup}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default DataTable
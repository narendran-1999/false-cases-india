import React from 'react'
import './DataTables.css'
import getCrimeData from '../../data/get-data'

const makeTable = (data) => {
  // Make table body from a number array
  return data.map((row, rowIndex) => (

    <tr key={rowIndex}>
      {
        row.map((cell, cellIndex) => (
          <td key={cellIndex}>{
            // NA for quashed cases in 2016
            ( row[0]==2016 && (cellIndex==4 || cellIndex==5) ) ? 'NA' : cell
          }</td>
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
        <div className="btn-container">
          <button className="btn btn-danger" onClick={closePopup}>Close</button>
        </div>

        <h3>{ tabletitle.toUpperCase() }</h3>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th rowSpan="2">Year</th>
                <th rowSpan="2">FR Non-Cognizable</th>
                <th rowSpan="2">Final Report False</th>
                <th rowSpan="2">Mistake of Fact or Law or Civil Dispute</th>
                <th colSpan="2">Quashed</th>
                <th rowSpan="2">Convicted</th>
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
        </div>
      </div>
    </div>
  )
}

export default DataTable
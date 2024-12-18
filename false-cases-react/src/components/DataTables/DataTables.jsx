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

const DataTable = (isMetro, crime) => {
  const { data, title } = getCrimeData(crime, isMetro)
  
  return (
    <div className="table-container">

      <h2>{title}</h2>

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
          { makeTable(data) }
        </tbody>

      </table>
    </div>
  )
}

const openTable = (isMetro, crime) => {
  
}

export default openTable
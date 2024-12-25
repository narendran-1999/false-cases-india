import React from 'react'
import './CitiesList.css'

const cities = {
  Bihar: ["Patna"],
  "Delhi (NCR)": ["Delhi"],
  Gujarat: ["Ahmedabad", "Surat"],
  Karnataka: ["Bengaluru"],
  Kerala: ["Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Indore"],
  Maharashtra: ["Mumbai", "Nagpur", "Pune"],
  Rajasthan: ["Jaipur"],
  "Tamil Nadu": ["Chennai", "Coimbatore"],
  Telangana: ["Hyderabad"],
  "Uttar Pradesh": ["Ghaziabad", "Kanpur", "Lucknow"],
  "West Bengal": ["Kolkata"]
}

const CitiesList = () => {
  return (
    <div className='metro-cities-list'>
        <div className="cities-head">
          LISTED CITIES (19)
        </div>

        <div className="cities-body">
          {
            Object.entries(cities).map(([state, cities]) => (
              <div key={state} className='state-box'>
                {cities.map((city) => (
                  <div key={city} className='city-item'>{city}</div>
                ))}
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default CitiesList
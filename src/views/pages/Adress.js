import React from 'react'
import { Country, State, City } from 'country-state-city'
import { useState, useEffect } from 'react'
export default function Adress() {
  const [country, setcountry] = useState('Afghanistan')
  const [state, setstate] = useState('Balkh')
  const [countriess, setcountriess] = useState([])
  const countries = Country.getAllCountries()
  const states = State.getAllStates()
  const Cities = City.getAllCities()
  const code = countries.find((el) => el.name === country).isoCode
  const phonecode = countries.find((el) => el.name === country).phonecode
  const statecode = states.find((el) => el.name === state).isoCode
  console.log('state coded' + statecode)

  return (
    <div>
      <div>
        <h4>Country</h4>
        <select onChange={(e) => setcountry(e.target.value)}>
          {countries.map((el) => {
            return <option key={el.name}>{el.name}</option>
          })}
        </select>
        <h4>States</h4>
        <select onChange={(e) => setstate(e.target.value)}>
          {states
            .filter((e) => e.countryCode === code)
            .map((el) => {
              return <option key={el.name}>{el.name}</option>
            })}
        </select>
        <h4>Cities</h4>
        <select onChange={(e) => setstate(e.target.value)}>
          {Cities.filter((e) => e.stateCode === statecode && e.countryCode === code).map((el) => {
            return <option key={el.name}>{el.name}</option>
          })}
        </select>
        <h4>Phone :+{phonecode}</h4> <input type="number"></input>
      </div>
    </div>
  )
}

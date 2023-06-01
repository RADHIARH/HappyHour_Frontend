import React from 'react'
import { Country, State, City } from 'country-state-city'
import { useState, useEffect } from 'react'
import { useDispatch, useCFormSelector } from 'react-redux'
import { addAdress } from 'src/redux/adressAPIslice'
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'
export default function Adress() {
  const [country, setcountry] = useState('Afghanistan')
  const [state, setstate] = useState('Balkh')
  const [phone, setphone] = useState('')
  const [city, setcity] = useState('')
  const countries = Country.getAllCountries()
  const states = State.getAllStates()
  const Cities = City.getAllCities()
  const dispatch = useDispatch()
  const code = countries.find((el) => el.name === country).isoCode
  const phonecode = countries.find((el) => el.name === country).phonecode
  const statecode = states.find((el) => el.name === state).isoCode

  useEffect(() => {
    dispatch(
      addAdress({
        country: country,
        state: state,
        city: city,
        phone: phone,
      }),
    )
    console.log(country + city + state + phone)
  }, [country, state, city, phone])
  return (
    <div>
      <div className="m-4">
        {/* country and state  */}
        <div className="d-flex">
          <h6 className="m-2"> Country</h6>
          <CFormSelect onChange={(e) => setcountry(e.target.value)}>
            {countries.map((el) => {
              return <option key={el.name}>{el.name}</option>
            })}
          </CFormSelect>
          <h6 className="m-2">States</h6>
          <CFormSelect onChange={(e) => setstate(e.target.value)}>
            {states
              .filter((e) => e.countryCode === code)
              .map((el) => {
                return <option key={el.name}>{el.name}</option>
              })}
          </CFormSelect>
        </div>
        {/* city and phone number  */}
        <div className="d-flex m-3">
          <h6 className="m-2">Cities</h6>
          <CFormSelect onChange={(e) => setcity(e.target.value)}>
            {Cities.filter((e) => e.stateCode === statecode && e.countryCode === code).map((el) => {
              return <option key={el.name}>{el.name}</option>
            })}
          </CFormSelect>
          <div className="d-flex">
            <h6 className="m-2">Phone :+{phonecode}</h6>{' '}
            <CFormInput
              style={{ width: '200px' }}
              type="text"
              onChange={(e) => setphone(e.target.value)}
            ></CFormInput>
          </div>
        </div>
      </div>
    </div>
  )
}

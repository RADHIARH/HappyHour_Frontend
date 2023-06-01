import React from 'react'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Adress from '../Adress'
import '../../../style.css'
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
import DatePicker from 'react-datepicker'
import { useSelector } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
//
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { country, state, city, phone } = useSelector((state) => state.adress)
  const navigate = useNavigate()
  const [role, setrole] = useState('')
  const HandleSelect = (e) => {
    setUser({
      ...User,
      role: parseInt(e.target.value),
    })
  }
  const [User, setUser] = useState({
    username: '',
    email: '',
    user_password: '',
    firstname: '',
    lastname: '',
    phone: phone,
    user_address: country + state + city,
    role: 2,
    birth: '',
  })
  console.log('user is ' + JSON.stringify(User))
  const [error, setError] = useState('')
  const HandleChange = (event) => {
    setUser({
      ...User,
      [event.target.name]: event.target.value,
    })
  }

  const register = async (e) => {
    e.preventDefault()

    try {
      const url = 'https://project-happhour.vercel.app/register'
      console.log(User)
      const { data } = await axios.post(url, User)
      navigate('/login')
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }
    // useeffect
  }
  useEffect(() => {
    setUser({
      ...User,
      user_address: country + state + city,
      phone: phone,
    })
  }, [country, state, city, phone])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-start">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 shadow" style={{ width: '800px' }}>
              <CCardBody className="p-4">
                <CForm onSubmit={register}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  {/* username */}
                  <CInputGroup className="mb-3 input">
                    <CFormLabel className="label">Username</CFormLabel>
                    <br></br>

                    <CFormInput name="username" required onChange={HandleChange} />
                  </CInputGroup>
                  {/* email */}
                  <CInputGroup className="mb-3 input">
                    {/* <CInputGroupText>@</CInputGroupText> */}
                    <CFormLabel className="label">Email</CFormLabel>
                    <CFormInput name="email" type="email" required onChange={HandleChange} />
                  </CInputGroup>
                  {/* // password  */}
                  <CInputGroup className="mb-3 input">
                    {/* <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText> */}
                    <CFormLabel className="label">Password</CFormLabel>
                    <CFormInput
                      type="password"
                      required
                      name="user_password"
                      onChange={HandleChange}
                    />
                  </CInputGroup>
                  {/* // firstname  */}
                  <CInputGroup className="mb-3 input">
                    {/* <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText> */}
                    <CFormLabel className="label">First Name</CFormLabel>
                    <CFormInput type="text" name="firstname" required onChange={HandleChange} />
                  </CInputGroup>
                  {/* // lastname  */}
                  <CInputGroup className="mb-3 input">
                    <CFormLabel className="label">Last Name</CFormLabel>
                    <CFormInput type="text" name="lastname" required onChange={HandleChange} />
                  </CInputGroup>
                  {/* address */}
                  <CInputGroup className="mb-3 input">
                    <CFormLabel className="label">Address</CFormLabel>
                    {/* <CFormInput name="user_address" onChange={HandleChange} /> */}
                    <Adress />
                  </CInputGroup>
                  {/* birthdate */}
                  <CInputGroup className="input" style={{ marginTop: 150 }}>
                    <CFormLabel className="label">Birthdate</CFormLabel>
                    <CFormInput
                      placeholder="birthday"
                      required
                      type="date"
                      name="birth"
                      onChange={HandleChange}
                    />
                  </CInputGroup>

                  <div className="d-flex  m-3 ">
                    <CFormLabel className="label">Role</CFormLabel>
                    <CFormSelect aria-label="Default select example" onChange={HandleSelect}>
                      <option>Open this select menu</option>
                      <option value="2">User</option>
                      <option value="3">Manager</option>
                    </CFormSelect>
                    {/* <select value={User.role} onChange={HandleSelect}>
                      <option value={2}>User</option>
                      <option value={3}>Manager</option>
                    </select> */}
                  </div>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <div className="d-grid m-3">
                    <CFormInput color="success" type="submit" value="register"></CFormInput>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

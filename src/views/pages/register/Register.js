import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
// import axios
import axios from 'axios'
//
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const HandleSelect = (e) => {
    setUser({
      ...User,
      role: e.target.value,
    })
    console.log(e.target.value)
  }
  const [User, setUser] = useState({
    username: '',
    email: '',
    user_password: '',
    firstname: '',
    lastname: '',
    phone: '',
    user_address: '',
    role: 2,
  })
  const [error, setError] = useState('')
  const HandleChange = (event) => {
    setUser({
      ...User,
      [event.target.name]: event.target.value,
    })
  }

  const register = async (e) => {
    e.preventDefault()
    //   try {
    //     const { data } = await axios.post('https://project-happhour.vercel.app/register', User)
    //   } catch (error) {
    //     setError('user already exist')
    //   }
    // }

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
  }
  useEffect(() => {
    console.log(error)
    console.log('selected' + User.role)
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  {/* username */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>

                    <CFormInput placeholder="Username" name="username" onChange={HandleChange} />
                  </CInputGroup>
                  {/* email */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" name="email" onChange={HandleChange} />
                  </CInputGroup>
                  {/* // password  */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="user_password"
                      onChange={HandleChange}
                    />
                  </CInputGroup>
                  {/* // firstname  */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Firstname"
                      name="firstname"
                      onChange={HandleChange}
                    />
                  </CInputGroup>
                  {/* // lastname  */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Lastname"
                      name="lastname"
                      onChange={HandleChange}
                    />
                  </CInputGroup>
                  {/* // phone  */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      onChange={HandleChange}
                    />
                  </CInputGroup>
                  {/* address */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Adress"
                      name="user_address"
                      onChange={HandleChange}
                    />
                  </CInputGroup>
                  {/* <CDropdown className="mb-3">
                    <CDropdownToggle color="secondary">Choose role</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem value="user" onChange={(e) => setselectedValue(e)}>
                        User
                      </CDropdownItem>
                      <CDropdownItem value="manager">Manager </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown> */}
                  <select value={User.role} onChange={HandleSelect}>
                    <option value={2}>User</option>
                    <option value={3}>Manager</option>
                  </select>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <div className="d-grid">
                    <CButton color="success" onClick={register}>
                      Create Account
                    </CButton>
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

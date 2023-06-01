import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchContent } from 'src/redux/userAPIslice'
import { deleteuser } from 'src/redux/userAPIslice'
import axios from 'axios'
import * as icon from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import './style.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
  CInputGroup,
  CFormInput,
  CAlert,
  CForm,
} from '@coreui/react'

const AddEtab = () => {
  const [etab, setetab] = useState({})
  const [error, setError] = useState('')
  const [file, setfile] = useState()
  // get token from localhost
  const token = localStorage.getItem('happytoken')
  const HandleChange = (e) => {
    setetab({
      ...etab,
      [e.target.name]: e.target.value,
    })
    console.log(etab)
  }
  const addnewEtab = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://project-happhour.vercel.app/etabllissments', etab, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      document.getElementById('message').style.visibility = 'visible'
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }
  }
  // delete etab

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4" style={{ width: '800px' }}>
            <CCardHeader style={{ display: 'flex' }}>
              <div>
                <h4>Add new Etabblissment </h4>
              </div>
            </CCardHeader>
            {/* etab name */}
            <CCardBody>
              <CForm onSubmit={addnewEtab}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder=" Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    type="text"
                    name="name"
                    onChange={HandleChange}
                    required
                  />
                </CInputGroup>
                {/* etab name  */}
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="email "
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    type="email"
                    name="email"
                    onChange={HandleChange}
                    required
                  />
                </CInputGroup>
                {/* adress */}
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="adress "
                    aria-label="adress"
                    aria-describedby="basic-addon1"
                    type="text"
                    name="adress"
                    onChange={HandleChange}
                    required
                  />
                </CInputGroup>
                {/* phone */}
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="phone number "
                    aria-label="phone"
                    aria-describedby="basic-addon1"
                    type="text"
                    name="phone"
                    onChange={HandleChange}
                    required
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CFormInput type="submit" name="submitb " value="Add" />
                </CInputGroup>
                {error && <CAlert color="danger">{error}</CAlert>}
                <div id="message" style={{ marginTop: 10, visibility: 'hidden' }}>
                  <CAlert color="primary">Etab has been added !</CAlert>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AddEtab

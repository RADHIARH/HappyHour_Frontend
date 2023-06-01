import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormLabel,
  CInputGroup,
  CFormInput,
  CInputGroupText,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {} from '@coreui/icons'

const Profile = () => {
  const { id } = useParams()
  const [user, setuser] = useState({})
  const token = localStorage.getItem('happytoken')
  const getUser = async () => {
    const { data } = await axios.get(`https://project-happhour.vercel.app/users/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    setuser(data[0])
  }
  useEffect(() => {
    getUser()
    console.log('user' + user)
  }, [])
  return (
    <>
      <div className="d-flex">
        <CCard
          className="mb-4 shadow"
          style={{ backgroundColor: '', width: '40% ', height: '750px' }}
        >
          <CCardBody>
            <div>
              <h4 style={{ fontWeight: 'bold' }}>
                {user.firstname}

                {user.lastname}
              </h4>
            </div>
            {/* <CButton>Admin</CButton> */}
          </CCardBody>
        </CCard>
        <CCard
          className="mb-4 shadow"
          style={{ backgroundColor: '', width: '60% ', marginLeft: '20px', height: '750px' }}
        >
          <CCardBody>
            <div className="d-flex" style={{ margin: 20 }}>
              <div>
                <h3>User Infos</h3>
              </div>
              <div style={{ position: 'absolute', right: 5 }}>
                <CButton>Edit Profile</CButton>
              </div>
            </div>

            {/* firstname */}
            <CInputGroup className="mb-3" style={{ fontSize: '25px' }}>
              <CFormLabel style={{ width: '200px' }}>First Name</CFormLabel>

              <CFormInput style={{ fontSize: '20px' }} defaultValue={user.username} />
            </CInputGroup>
            {/* lastname */}
            <CInputGroup className="mb-3" style={{ fontSize: '25px' }}>
              <CFormLabel style={{ width: '200px' }}>Last Name</CFormLabel>
              <CFormInput style={{ fontSize: '20px' }} defaultValue={user.lastname} />
            </CInputGroup>
            {/* address */}
            <CInputGroup className="mb-3" style={{ fontSize: '25px' }}>
              <CFormLabel style={{ width: '200px' }}>Address</CFormLabel>
              <CFormInput style={{ fontSize: '20px' }} defaultValue={user.firstname} />
            </CInputGroup>
            {/* email */}
            <CInputGroup className="mb-3" style={{ fontSize: '25px' }}>
              <CFormLabel style={{ width: '200px' }}>Email</CFormLabel>
              <CFormInput style={{ fontSize: '20px' }} defaultValue={user.email} />
            </CInputGroup>
            {/* phone number */}
            <CInputGroup className="mb-3" style={{ fontSize: '25px' }}>
              <CFormLabel style={{ width: '200px' }}>Phone Number</CFormLabel>
              <CFormInput style={{ fontSize: '20px' }} defaultValue={user.phone} />
            </CInputGroup>
            {/*address */}
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Profile

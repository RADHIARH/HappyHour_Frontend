import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import * as icon from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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
} from '@coreui/react'

const Users = () => {
  const [users, setusers] = useState([])
  const [error, setError] = useState('')
  // get token from localhost
  const token = localStorage.getItem('happytoken')
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get('https://project-happhour.vercel.app/users', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      setusers(data)
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }
  }
  useEffect(() => {
    getAllUsers()
    console.log('users' + users)
  }, [])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <CCardHeader>Users List</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    <CTableHeaderCell>username</CTableHeaderCell>

                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">FirstName</CTableHeaderCell>
                    <CTableHeaderCell>LastName</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* logo */}
                      {/* <CTableDataCell className="text-center">
                        <CAvatar size="md" src={''} status={''} />
                      </CTableDataCell> */}
                      {/* // username */}
                      <CTableDataCell>
                        <div>{item.username}</div>
                      </CTableDataCell>
                      {/* email */}
                      <CTableDataCell className="text-center">{item.email}</CTableDataCell>
                      {/* firstname */}
                      <CTableDataCell>{item.firstname}</CTableDataCell>
                      {/* lastname  */}
                      <CTableDataCell className="text-center">{item.lastname}</CTableDataCell>
                      {/* phone  */}
                      <CTableDataCell>{item.phone}</CTableDataCell>
                      {/* address */}
                      <CTableDataCell>{item.user_address}</CTableDataCell>
                      <CTableDataCell>
                        {' '}
                        <CIcon icon={icon.cilList} size="xxl" />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Users

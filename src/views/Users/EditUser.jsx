import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import * as icon from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import './style.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
} from '@coreui/react'

const EditUser = () => {
  const [user, setuser] = useState({})
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const token = localStorage.getItem('happytoken')
  const { id } = useParams()
  // get token from localhost
  console.log('id' + id)
  const getUser = async () => {
    try {
      const { data } = await axios.get(`https://project-happhour.vercel.app/users/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      console.log('userrr' + data[0])
      setuser(data[0])
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }
  }
  // handle change
  const HandleChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    })
    console.log(user)
  }
  const edit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`https://project-happhour.vercel.app/users/${id}`, user, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  // use effect
  useEffect(() => {
    getUser()
    console.log('users' + user)
  }, [])

  return (
    <>
      <CRow>
        <CCol xs>
          {/* {state.map((element) => {
            return (
              <div key={element.id} style={{ display: 'flex' }}>
                <h1>{element.username}</h1>
                <h1>{element.email}</h1>
                <button onClick={() => dispatch(deleteuser({ id: element.id }))}> delete</button>
                <button onClick={edit}> edit</button>
              </div>
            )
          })}
          <div>
            <button onClick={addnewuser}>add</button>
          </div> */}
          {/* <div>
            <h1>import data from api</h1>
            {content.map((element) => {
              return <>{element.username}</>
            })}
          </div> */}
          <CCard className="mb-4">
            {error && <div style={{ color: 'red' }}>{error}</div>}{' '}
            <CCardHeader style={{ display: 'flex' }}>
              <div>Edit User </div>
            </CCardHeader>
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
                  <CTableRow v-for="user in tableUsers" key={user.id}>
                    {/* // username */}
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        name="username"
                        defaultValue={user.username}
                        onChange={HandleChange}
                      />
                    </CTableDataCell>
                    {/* email */}
                    <CTableDataCell className="text-center">
                      {' '}
                      <CFormInput
                        type="email"
                        name="email"
                        defaultValue={user.email}
                        onChange={HandleChange}
                      />
                    </CTableDataCell>
                    {/* firstname */}
                    <CTableDataCell className="text-center">
                      {' '}
                      <CFormInput
                        type="text"
                        name="firstname"
                        defaultValue={user.firstname}
                        onChange={HandleChange}
                      />
                    </CTableDataCell>
                    {/* lastname  */}
                    <CTableDataCell className="text-center">
                      {' '}
                      <CFormInput
                        type="text"
                        name="lastname"
                        defaultValue={user.lastname}
                        onChange={HandleChange}
                      />
                    </CTableDataCell>
                    {/* phone  */}
                    <CTableDataCell>
                      {' '}
                      <CFormInput
                        type="text"
                        name="phone"
                        defaultValue={user.phone}
                        onChange={HandleChange}
                      />
                    </CTableDataCell>
                    {/* address */}
                    <CTableDataCell>
                      {' '}
                      <CFormInput
                        type="text"
                        name="user_address"
                        defaultValue={user.user_address}
                        onChange={HandleChange}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      {' '}
                      <button onClick={edit}> Edit</button>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default EditUser

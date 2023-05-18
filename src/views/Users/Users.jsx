import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { adduser } from 'src/redux/userSlice'
import { fetchContent } from 'src/redux/userAPIslice'
import { deleteuser } from 'src/redux/userAPIslice'
import { edituser } from 'src/redux/userAPIslice'
import axios from 'axios'
import * as icon from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import './style.css'
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
  cilColorBorder,
  cilPlus,
  cilX,
} from '@coreui/react'

const Users = () => {
  const [users, setusers] = useState([])
  const [error, setError] = useState('')
  const state = useSelector((state) => state.user.users)
  const content = useSelector((state) => state.content.contents)
  const dispatch = useDispatch()
  // get token from localhost
  const token = localStorage.getItem('happytoken')
  // const getAllUsers = async () => {
  //   try {
  //     const { data } = await axios.get('https://project-happhour.vercel.app/users', {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     })
  //     setusers(data)
  //   } catch (error) {
  //     if (error.response && error.response.status >= 400 && error.response.status <= 500) {
  //       setError(error.response.data.message)
  //     }
  //   }
  // }
  // const addnewuser = () => {
  //   dispatch(
  //     adduser({
  //       id: 2,
  //       username: 'maha',
  //       email: 'maha@gmail.com',
  //     }),
  //   )
  // }
  // const edit = () => {
  //   dispatch(
  //     edituser({
  //       id: 1,
  //       username: 'rouroru',
  //       email: 'rourou@gmail.com',
  //     }),
  //   )
  // }
  // useEffect(() => {
  //   getAllUsers()
  //   console.log('users' + state)
  // }, [state])
  useEffect(() => {
    dispatch(fetchContent())
  }, [dispatch])
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
              <div>Users List</div>
              <div style={{ position: 'absolute', right: 0 }}>
                <button style={{}}>
                  <CIcon icon={icon.cilPlus} style={{ fontsize: '20px' }}></CIcon>
                  ADD new user
                </button>
              </div>
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
                  {content.map((item, index) => (
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
                        <button
                          onClick={() =>
                            dispatch(
                              edituser({
                                id: item.id,
                                username: 'blabla',
                                email: 'email@gmail.com',
                              }),
                            )
                          }
                        >
                          {' '}
                          <CIcon
                            icon={icon.cilColorBorder}
                            style={{ marginRight: 20 }}
                            size="xxl"
                          />
                        </button>
                        <button onClick={() => dispatch(deleteuser({ id: item.id }))}>
                          <CIcon icon={icon.cilX} size="xxl" />
                        </button>
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

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

const Managers = () => {
  const navigate = useNavigate()
  // get token from localhost
  const token = localStorage.getItem('happytoken')
  // use params
  const { id } = useParams()
  const [managers, setmanagers] = useState([])
  const [filter, setfilter] = useState('')
  const getAllManagers = async () => {
    try {
      const { data } = await axios.get('https://project-happhour.vercel.app/managers', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      setmanagers(data)
    } catch (err) {
      console.log(err)
    }
  }
  // delete manager
  const deleteManager = async (id) => {
    try {
      await axios.delete(`https://project-happhour.vercel.app/users/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      getAllManagers()
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getAllManagers()
    console.log(managers)
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
            <CCardHeader style={{ display: 'flex' }}>
              <div>
                <h4>Managers List</h4>
              </div>
              <div style={{ position: 'absolute', right: 0 }}>
                {/* <button style={{}}>
                  <CIcon icon={icon.cilPlus} style={{ fontsize: '20px' }}></CIcon>
                  ADD new user
                </button> */}
              </div>
            </CCardHeader>
            <CCardBody>
              <CFormInput
                style={{ width: '90%', margin: 20 }}
                type="text"
                placeholder="serach manager"
                onChange={(e) => setfilter(e.target.value)}
              />
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
                  {managers
                    .filter((e) => e.username.toLowerCase().includes(filter.toLowerCase()))
                    .map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
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
                          <button>
                            {' '}
                            <CIcon
                              icon={icon.cilColorBorder}
                              style={{ marginRight: 20 }}
                              size="xxl"
                            />
                          </button>
                          <button onClick={() => deleteManager(item.id)}>
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

export default Managers

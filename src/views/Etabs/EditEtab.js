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

const EditEtab = () => {
  const [etab, setetab] = useState({})
  const [file, setfile] = useState()
  const token = localStorage.getItem('happytoken')
  const { id } = useParams()
  // get token from localhost
  console.log('id' + id)
  const getEtab = async () => {
    try {
      const { data } = await axios.get(`https://project-happhour.vercel.app/etabllissments/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      console.log('etabrr' + data[0])
      setetab(data)
    } catch (error) {
      console.log(error)
    }
  }
  // handle change
  const HandleChange = (e) => {
    setetab({
      ...etab,
      [e.target.name]: e.target.value,
    })
    console.log(etab)
  }
  const onfilechange = (e) => {
    setfile(e.target.files[0])
    console.log('file' + e.target.files[0])
  }
  const edit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`https://project-happhour.vercel.app/etabllissments/${id}`, etab, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      const formData = new FormData()
      formData.append('profileImg', file)
      await axios.post(`http://localhost:3001/upload/image/${id}`, formData, {
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
    getEtab()
  }, [])

  return (
    <>
      <CRow>
        <CCol xs>
          {/* {state.map((element) => {
            return (
              <div key={element.id} style={{ display: 'flex' }}>
                <h1>{element.etabname}</h1>
                <h1>{element.email}</h1>
                <button onClick={() => dispatch(deleteetab({ id: element.id }))}> delete</button>
                <button onClick={edit}> edit</button>
              </div>
            )
          })}
          <div>
            <button onClick={addnewetab}>add</button>
          </div> */}
          {/* <div>
            <h1>import data from api</h1>
            {content.map((element) => {
              return <>{element.etabname}</>
            })}
          </div> */}
          <CCard className="mb-4">
            <CCardHeader style={{ display: 'flex' }}>
              <div>Edit Etab </div>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    <CTableHeaderCell>etabname</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Logo</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow v-for="etab in tableEtabs" key={etab.id}>
                    {/* // etabname */}
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        name="etab_name"
                        defaultValue={etab.etab_name}
                        onChange={HandleChange}
                      />
                    </CTableDataCell>
                    {/* email */}
                    <CTableDataCell className="text-center">
                      {' '}
                      <CFormInput
                        type="email"
                        name="email"
                        defaultValue={etab.email}
                        onChange={HandleChange}
                      />
                    </CTableDataCell>

                    {/* phone  */}
                    <CTableDataCell>
                      {' '}
                      <CFormInput
                        type="text"
                        name="phone"
                        defaultValue={etab.phone}
                        onChange={HandleChange}
                      />
                    </CTableDataCell>
                    {/* address */}
                    <CTableDataCell>
                      {' '}
                      <CFormInput
                        type="text"
                        name="adress"
                        defaultValue={etab.adress}
                        onChange={HandleChange}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      {' '}
                      <CFormInput type="file" onChange={onfilechange} />
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

export default EditEtab

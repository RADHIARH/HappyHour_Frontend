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
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
} from '@coreui/react'

const Etabs = () => {
  const [etabs, setetabs] = useState([])
  const [filtered, setfilter] = useState('')
  const navigate = useNavigate()
  // get token from localhost
  const token = localStorage.getItem('happytoken')
  // get all etabls
  const getAllEtabs = async () => {
    try {
      const { data } = await axios.get('https://project-happhour.vercel.app/etabllissments', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      setetabs(data)
      console.log('data' + etabs)
    } catch (error) {
      console.log(error)
    }
  }
  // delete etab
  const deleteEtab = async (id) => {
    try {
      await axios.delete(`https://project-happhour.vercel.app/etabllissments/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      getAllEtabs()
    } catch (err) {
      console.log(err)
    }
  }
  // edit etab
  const edit = (id) => {
    navigate(`/edit/etab/${id}`)
  }
  // add new etab
  const addEtab = () => {
    navigate('/add/etab')
  }
  // use effect
  useEffect(() => {
    getAllEtabs()

    console.log('etablisssments' + JSON.stringify(etabs))
    console.log('filter' + filtered)
  }, [filtered])
  // useEffect(() => {
  //   dispatch(fetchContent())
  // }, [dispatch])
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader style={{ display: 'flex' }}>
              <div>
                <h4>Etabs List</h4>
              </div>
              <div style={{ position: 'absolute', right: 0 }}>
                <button onClick={addEtab}>
                  <CIcon icon={icon.cilPlus} style={{ fontsize: '20px' }}></CIcon>
                  ADD new Etab
                </button>
              </div>
            </CCardHeader>
            <CCardBody>
              <CFormInput
                type="text"
                placeholder="serach etab"
                onChange={(e) => setfilter(e.target.value)}
              />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    <CTableHeaderCell>EtabName</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {etabs
                    .filter((e) => e.etab_name.toLowerCase().includes(filtered.toLowerCase()))
                    .map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        {/* // username */}
                        <CTableDataCell>
                          <div>{item.etab_name}</div>
                        </CTableDataCell>
                        {/* email */}
                        <CTableDataCell className="text-center">{item.email}</CTableDataCell>
                        {/* phone  */}
                        <CTableDataCell>{item.phone}</CTableDataCell>
                        {/* address */}
                        <CTableDataCell>{item.adress}</CTableDataCell>
                        <CTableDataCell>
                          {' '}
                          <button onClick={() => edit(item.id)}>
                            {' '}
                            <CIcon
                              icon={icon.cilColorBorder}
                              style={{ marginRight: 20 }}
                              size="xxl"
                            />
                          </button>
                          <button onClick={() => deleteEtab(item.id)}>
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

export default Etabs

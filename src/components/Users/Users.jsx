import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
export default function Users() {
  const [Users, setUsers] = useState([])
  const getAllUsers = async () => {
    await axios
      .get('http://localhost:3001/users', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6MSwiaWF0IjoxNjgzOTIzMDQxLCJleHAiOjE2ODQwOTU4NDF9.yliL9xCRhV-9ZD82__6pJbBLYYNeYat40gy_3f6mnMw',
        },
      })
      .then((response) => setUsers(response.data))
  }
  useEffect(() => {
    getAllUsers()
    console.log(Users)
  }, [])
  return (
    <div>
      <h1>
        {Users.map((element) => {
          return (
            <>
              <h1>{element.username}</h1>
            </>
          )
        })}
      </h1>
    </div>
  )
}

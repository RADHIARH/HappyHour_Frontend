import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    users: [
      {
        id: 1,
        username: 'radhia rh',
        email: 'user@gmail.com',
      },
    ],
  },
  reducers: {
    adduser: (state, action) => {
      state.users.push(action.payload)
    },
    deleteuser: (state, action) => {
      return {
        ...state,
        users: state.users.filter((element) => element.id !== action.payload.id),
      }
    },
    edituser: (state, action) => {
      return {
        ...state,
        users: state.users.map((element) =>
          element.id === action.payload.id ? action.payload : element,
        ),
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { adduser, deleteuser, edituser } = counterSlice.actions

export default counterSlice.reducer

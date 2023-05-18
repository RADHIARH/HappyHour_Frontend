import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import userSlice from './userSlice'
const token = localStorage.getItem('happytoken')
export const fetchContent = createAsyncThunk('content/fetchContent', async () => {
  const res = await axios.get('https://project-happhour.vercel.app/users', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  const data = await res.data
  return data
})

const contentSlice = createSlice({
  name: 'userapi',
  initialState: {
    isLoading: false,
    message: '',
    contents: [],
  },
  reducers: {
    deleteuser: (state, action) => {
      return {
        ...state,
        contents: state.contents.filter((element) => element.id !== action.payload.id),
      }
    },
    edituser: (state, action) => {
      return {
        ...state,
        contents: state.contents.map((element) =>
          element.id === action.payload.id ? action.payload : element,
        ),
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false
      state.contents = action.payload
    })
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})
// export const {} = userSlice.actions
export const { deleteuser, edituser } = contentSlice.actions
export default contentSlice.reducer

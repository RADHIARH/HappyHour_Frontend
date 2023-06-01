import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const AdressSlice = createSlice({
  name: 'adress',
  initialState: {
    isLoading: false,
    country: '',
    city: '',
    state: '',
    phone: '',
  },
  reducers: {
    addAdress: (state, action) => {
      return {
        ...state,
        country: action.payload.country,
        city: action.payload.city,
        state: action.payload.state,
        phone: action.payload.phone,
      }
    },
  },
})
// export const {} = userSlice.actions
export const { addAdress } = AdressSlice.actions
export default AdressSlice.reducer

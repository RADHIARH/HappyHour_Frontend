// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../src/redux/userSlice'
import userAPIReducer from './redux/userAPIslice'
import adressReducer from './redux/adressAPIslice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    content: userAPIReducer,
    adress: adressReducer,
  },
})

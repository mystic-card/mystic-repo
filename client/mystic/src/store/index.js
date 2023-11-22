import { configureStore } from '@reduxjs/toolkit'
import setCoderoom from './coderoom'

export default configureStore({
  reducer: {
    setCoderoom
  }
})
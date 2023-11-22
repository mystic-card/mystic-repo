import { createSlice } from '@reduxjs/toolkit'

const coderoom = createSlice({
  name: "coderoom",
  initialState: {
    coderoom: ""
  },
  reducers: {
    setCoderoom: (state, { payload }) => {
      state.coderoom = payload.passcode
    }
  }
})

export const { setCoderoom } = coderoom.actions
export default coderoom.reducer
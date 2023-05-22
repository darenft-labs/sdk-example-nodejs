import { createSlice } from "@reduxjs/toolkit"

type SliceState = {
  isOpened: boolean
}

const initialState: SliceState = {
  isOpened: false,
}

export const modalConnectWalletSlice = createSlice({
  name: "modal-connect-wallet",
  initialState,
  reducers: {
    resetModalState: () => initialState,
    setModalOpened: (state, action) => {
      state.isOpened = action.payload
    },
  },
})

const { setModalOpened } = modalConnectWalletSlice.actions
export { setModalOpened }

import { configureStore } from "@reduxjs/toolkit"
import uiSlice from "@/redux/loading"
import authSlice from "@/redux/auth"
import { modalConnectWalletSlice } from "./modal-connect-wallet"
import { nftData } from "./nfts"

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    modalConnectWallet: modalConnectWalletSlice.reducer,
    nftData: nftData.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

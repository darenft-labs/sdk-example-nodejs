import { createSlice } from "@reduxjs/toolkit"

type SliceState = {
  list: LocalNftType[]
  walletAddress: string
}

const initialState: SliceState = {
  list: [],
  walletAddress: "",
}

export const nftData = createSlice({
  name: "nft-data",
  initialState,
  reducers: {
    initDataNft: (state, action) => {
      state.list = action.payload
    },

    setDataNft: (state, action) => {
      state.list = action.payload.nftList
      state.walletAddress = action.payload.walletAddress
    },
    setNftList: (state, action) => {
      state.list.unshift(action.payload)
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload
    },
  },
})

const { initDataNft, setDataNft, setWalletAddress, setNftList } = nftData.actions
export { initDataNft, setDataNft, setWalletAddress, setNftList }

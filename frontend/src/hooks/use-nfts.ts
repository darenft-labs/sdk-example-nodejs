import { setDataNft, setNftList } from "@/redux/nfts"

import { useEthers } from "@usedapp/core"
import { useDispatch } from "react-redux"

export const useNftData = () => {
  const { account } = useEthers()
  const dispatch = useDispatch()
  const localData = JSON.parse(localStorage.getItem(`${account}`))

  const initData = () => {
    localStorage.setItem(
      `${account}`,
      JSON.stringify({ walletAddress: account, nftList: localData?.nftList ?? [] })
    )
    dispatch(setDataNft({ nftList: localData?.nftList ?? [], walletAddress: account }))
  }

  const setData = (data) => {
    const list = localData?.nftList
    list.unshift(data)
    localStorage.setItem(`${account}`, JSON.stringify({ walletAddress: account, nftList: list }))
    dispatch(setNftList(data))
  }

  return {
    initData,
    setData,
  }
}

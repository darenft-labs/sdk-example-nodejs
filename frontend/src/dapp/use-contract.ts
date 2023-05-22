import { useMemo } from "react"
import { ethers } from "ethers"
import { Contract } from "@ethersproject/contracts"

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

export const useContract = (address: string, abi: any): ethers.Contract | any => {
  const contract = useMemo(() => {
    try {
      return new Contract(address, abi || [])
    } catch (e) {
      return new Contract(ZERO_ADDRESS, abi || [])
    }
  }, [address, abi])

  return contract
}

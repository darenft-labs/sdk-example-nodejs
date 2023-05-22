import { useContract } from "@/dapp/use-contract"
import { FeeMethod, FeeMethodAddress } from "@/helpers/static-data"
import { Interface } from "@ethersproject/abi"
import { useCall } from "@usedapp/core"

const abi = new Interface(["function feeOf(bytes32 method) public view returns (uint256)"])

interface Props {
  type: number
}

export const useFeeOf = ({ type }: Props) => {
  const contract = useContract("0xE8FB396925a4D41B80D5C130A3FD0DC4ABBA83d1", abi)

  let address: string
  switch (type) {
    case FeeMethod.UPDATE_METADATA:
      address = FeeMethodAddress?.UPDATE_METADATA
      break
    default:
      address = FeeMethodAddress?.UPDATE_METADATA
  }

  const rs = useCall({
    contract: contract,
    method: "feeOf",
    args: [address],
  })

  return rs?.value?.[0]
}

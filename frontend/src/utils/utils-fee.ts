import { BigNumber } from "ethers"

export const utilsFee = {
  methodFee: (number: BigNumber, numberNft = 1) => {
    return BigNumber.from(number).add(BigNumber.from(number).mul(10).div(100)).mul(numberNft)
  },
}

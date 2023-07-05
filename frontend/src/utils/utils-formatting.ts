import { BigNumber, utils } from "ethers"
import pluralize from "pluralize"

export const formattingUtils = {
  centerEllipsizeString: (input?: string | null, firstNumberChars = 5, lastNumberChart = 14) => {
    if (!input) return ""
    if (input.length < 10) return input
    return `${input.substring(0, firstNumberChars)}...${input.slice(0 - lastNumberChart)}`
  },

  pluralizeString: (inputStr: string, count: number) => {
    return pluralize(inputStr, count)
  },

  pad: (num: number) => {
    return num < 10 && num > 0 ? `0${num}` : num
  },

  toNumber: (value, type: string) => {
    return !!value ? (["number", "integer"].includes(type) ? Number(value) : value) : ""
  },

  toFixed: (value?: BigNumber, decimal = 4) => {
    if (!value) return ""
    let remainder = value.mod(Number(`1e1${decimal}`))

    return utils.formatEther(value.sub(remainder))
  },
}

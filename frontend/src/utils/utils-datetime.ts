import dayjs, { ConfigType } from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export const datetimeUtils = {
  utc: (config?: ConfigType, format?: string, strict?: boolean) => {
    return dayjs.utc(config, format, strict)
  },

  convertSecondToDay: (seconds: number) => {
    return seconds / (24 * 60 * 60)
  },
}

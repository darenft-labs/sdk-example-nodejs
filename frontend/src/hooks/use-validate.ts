export const useValidate = () => {
  const validate = (value: string, type: string) => {
    const limitNumber = /^[0-9]{1,16}$/
    const numberRegex =
      /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/

    const integerRegex = /^\d+$/
    if (type === "number")
      return numberRegex.test(value) &&
        limitNumber.test(value.toString().replace(/[^a-zA-Z0-9 ]/g, ""))
        ? undefined
        : "invalid"
    if (type === "integer")
      return limitNumber.test(value) && integerRegex.test(value) ? undefined : "Not integer"
    if (type === "boolean") return typeof value === "boolean" ? undefined : "Required"

    return value ? undefined : "Required"
  }

  return {
    validate,
  }
}

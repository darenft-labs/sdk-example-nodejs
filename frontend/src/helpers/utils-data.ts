import parse from "html-react-parser"
import { unescape } from "lodash"

const replaceObj = {
  "8217": "'",
  "8216": "'",
  "8211": "-",
  "038": "&",
}

export const dataUtils = {
  htmlStringToJSX: (contentHtml: string) => {
    return parse(contentHtml)
  },

  convertHtmlEntities: (input) => {
    return input.replace(/&#\d{1,5};/g, function (match) {
      return String.fromCharCode(match.replace("&#", "").replace(";", ""))
    })
  },
}

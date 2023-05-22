import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import features from "@/i18n/en/features.json"
import layouts from "@/i18n/en/layouts.json"
import shared from "@/i18n/en/shared.json"
import helpers from "@/i18n/en/helpers.json"

const resources = {
  en: {
    layouts,
    features,
    shared,
    helpers,
  },
}

i18next.use(initReactI18next).init({
  resources,
  lng: "en", // after if using a language detector, do not define the lng option
  fallbackLng: "en",
  supportedLngs: ["en"],
  ns: ["layouts", "shared", "features", "helpers"],
  defaultNS: ["features"],
  debug: import.meta.env.VITE_ENV === "dev",
})

export default i18next

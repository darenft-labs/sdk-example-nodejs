const fs = require("fs")
const glob = require("glob") // eslint-disable-line import/no-extraneous-dependencies
const { Parser } = require("i18next-scanner") // eslint-disable-line import/no-extraneous-dependencies

/*
 * Reads a single file and handles empty, corrupted or non existing files
 */
async function readFile(path) {
  if (await fs.existsSync(path)) {
    const content = fs.readFileSync(path, "utf8")
    try {
      return JSON.parse(content)
    } catch (e) {
      return {}
    }
  }
  return {}
}

/**
 * Reads the json files and returns the values in a single object
 */
async function readFiles(config) {
  const translations = {}
  async function read() {
    const nsTranslations = {}
    const i = Object.keys(translations).length
    for (let j = 0; j < config.ns.length; j++) {
      nsTranslations[config.ns[j]] = await readFile(
        `${config.outputPath}/${config.lng[i]}/${config.ns[j]}.json`
      )
    }
    translations[config.lng[i]] = nsTranslations
    if (i < config.lng.length - 1) await read()
  }
  await read()
  return translations
}

const getDeepValue = function (obj, path) {
  var paths = path.split("."),
    current = obj,
    i

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined
    } else {
      current = current[paths[i]]
    }
  }
  return current
}

const customHandler = function (parser, oldTranslations, key, options, isDefalut) {
  let value
  if (key.includes(" ")) {
    value = oldTranslations[key] || (isDefalut ? key : "")
  } else {
    value = isDefalut
      ? getDeepValue(oldTranslations, key) || oldTranslations[key] || key
      : getDeepValue(oldTranslations, key) || oldTranslations[key] || ""
  }

  if (options.context) {
    key += `_${options.context}`
  }
  parser.set(key, value)
  if (options.count !== undefined) {
    key = `${key}_plural`
    parser.set(key, oldTranslations[key] || "")
  }
}

/*
 * Parses the translations from the jsx files
 */
function parse(config, oldTranslations, files, lng) {
  const parser = new Parser({
    // keySeparator: false,
    // nsSeparator: false,
  })
  files
    .map((filePattern) => glob.sync(filePattern, {}))
    .reduce((accumulator, files) => [...accumulator, ...files], [])
    .forEach((file) => {
      const content = fs.readFileSync(file, "utf-8")
      parser.parseFuncFromString(
        content,
        { list: config.translationFunctionNames },
        (key, options) =>
          customHandler(parser, oldTranslations, key, options, lng === config.defaultLng)
      )
    })

  const translations = parser.get({ sort: true }).en.translation
  return translations
}

async function writeFile(config, language, resources, ns) {
  const dir = `${config.outputPath}/${language}`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  const outputJSON = `${JSON.stringify(resources, null, 2)}\n`
  fs.writeFileSync(`${config.outputPath}/${language}/${ns}.json`, outputJSON)
}

/*
 * Writes the new translations in all the translation files
 */
async function writeFiles(config, resources, ns) {
  let i = 0
  async function write() {
    const lng = config.lng[i]
    await writeFile(config, lng, resources[lng][ns], ns)
    i++
    if (i < config.lng.length) await write()
  }

  write()
}

async function i18nScanner() {
  const config = {
    files: ["src/features/**/*.{ts,tsx}", "src/layouts/**/*.{ts,tsx}", "src/shared/**/*.{ts,tsx}", "src/helpers/**/*.{ts,tsx}"],
    translationFunctionNames: ["i18next.t", "props.t", "this.props.t", "t", "i18n.t"],
    defaultLng: "en",
    ns: ["features", "layouts", "shared", "helpers"],
    lng: ["en"],
    outputPath: "src/i18n",
  }

  const resources = await readFiles(config)
  const newResourse = {}
  for (let j = 0; j < config.lng.length; j++) {
    const newData = {}
    for (let i = 0; i < config.ns.length; i++) {
      if (config.files[i]) {
        newData[config.ns[i]] = parse(
          config,
          resources[config.lng[j]][config.ns[i]],
          [config.files[i]],
          config.lng[j]
        )
      }
    }
    newResourse[config.lng[j]] = newData
  }

  const currentNs = Object.keys(newResourse[config.defaultLng])
  for (let i = 0; i < currentNs.length; i++) {
    writeFiles(config, newResourse, currentNs[i])
  }
}

i18nScanner()

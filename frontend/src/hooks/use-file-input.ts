import { useCallback, useEffect, useRef } from "react"

// https://github.com/rot1024/use-file-input
const useFileInput = (
  callback: (files: FileList) => void,
  opts: { accept?: string; multiple?: boolean }
) => {
  const input = useRef<HTMLInputElement>()

  useEffect(() => {
    input.current = document.createElement("input")
    input.current.type = "file"
  }, [])

  useEffect(() => {
    if (input.current) {
      if (opts) {
        input.current.accept = opts.accept || ""
        input.current.multiple = !!opts.multiple
      } else {
        input.current.accept = ""
        input.current.multiple = false
      }
    }
  }, [opts && opts.accept, opts && opts.multiple])

  useEffect(() => {
    if (input.current) {
      input.current.onchange = () => {
        if (input.current && input.current.files) {
          callback(input.current.files)
        }
      }
    }
  }, [callback])

  return {
    handleFileInput: useCallback(() => {
      if (input.current) {
        input.current.value = ""
        input.current.click()
      }
    }, [input.current]),

    readURL: (file?: File): Promise<string> => {
      return new Promise((res, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => res(e.target?.result as string)
        reader.onerror = (e) => reject(e)
        if (!file) return reject()
        reader.readAsDataURL(file)
      })
    },

    validateImg: (file: File, limitSize: number, ratio: number): Promise<boolean> => {
      return new Promise((res, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          let image = new Image()
          image.src = e.target.result.toString()

          image.onload = () => res(file.size <= limitSize && ratio === image.width / image.height)
        }
        reader.onerror = (e) => reject(e)
        if (!file) return reject()
        reader.readAsDataURL(file)
      })
    },
  }
}

export { useFileInput }

import { Field } from "react-final-form"
import { useValidate } from "@/hooks/use-validate"
import { Tooltip } from "@/shared/components/tooltip"
import { formattingUtils } from "@/utils/utils-formatting"
import { CustomIcon, Input, Select } from "@/shared/components"

interface Props {
  item: string
  type: string
}

const FormInteraction = ({ item, type }: Props) => {
  const { validate } = useValidate()

  const BOOLEAN_OPTION = [
    { label: "True", value: true },
    { label: "False", value: false },
  ]

  return (
    <>
      <label className="text-dark-strong-blue font-medium capitalize">
        <span className="flex items-center gap-1">
          {item}{" "}
          <span className="flex items-center">
            {" "}
            ({type}
            <Tooltip title={""} type={type} className="cursor-pointer">
              <CustomIcon
                iconName="info-grey"
                className="inline-block w-[11px] h-[11px] ml-1 mb-[2px]"
              />
            </Tooltip>{" "}
            )
          </span>
        </span>
      </label>
      <div className="mt-[10px] for-sale">
        <Field name={item} validate={(value) => validate(value, type)}>
          {({ input, meta }) => {
            return (
              <>
                {type !== "boolean" ? (
                  <Input
                    type={`${type}`}
                    placeholder="Enter value"
                    isError={meta?.touched && meta?.error}
                    className="bg-light-gray !h-14 !tracking-[2%] !px-[15px] !text-[13px] !leading-[18px] !text-grey-300 placeholder:text-light-gray-100 placeholder:text-[12px]"
                    {...input}
                    onChange={(e) => {
                      input.onChange(formattingUtils.toNumber(e?.target?.value, type))
                    }}
                  />
                ) : (
                  <Select
                    defaultValue={input?.value || undefined}
                    optionsData={BOOLEAN_OPTION}
                    placeholder="Select value"
                    className="!rounded !bg-white !text-xs"
                    labelInValue={true}
                    error={meta?.touched ? meta?.error : undefined}
                    onChange={(e) => {
                      input.onChange(e?.value)
                    }}
                  />
                )}
              </>
            )
          }}
        </Field>
      </div>
    </>
  )
}

export default FormInteraction

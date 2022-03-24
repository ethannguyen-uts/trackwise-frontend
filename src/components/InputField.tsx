import { useField } from 'formik'
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type InputFieldProps = {
  name: string
  type?: string
  label?: string
  istextarea?: 'true' | 'false'
  validate?: (value: any) => undefined | string | Promise<any>
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }, {}] = useField(props)
  return (
    <div className="mb-6 flex flex-col items-center">
      <div className="mb-1 w-full">
        <label
          className="text-gray-500 block pr-4 text-sm font-bold md:mb-0 md:text-left"
          htmlFor={field.name}
        >
          {props.label}
        </label>
      </div>
      <div className="w-full">
        {props.istextarea == 'true' ? (
          <textarea
            className="w-full appearance-none rounded border-2 border-moon bg-moon py-1 px-3 leading-tight focus:border-coral focus:bg-white focus:outline-none"
            {...field}
            {...props}
            id={field.name}
          ></textarea>
        ) : (
          <input
            className="w-full appearance-none rounded border-2 border-moon bg-moon py-1 px-3 leading-tight focus:border-coral focus:bg-white focus:outline-none"
            {...field}
            {...props}
            id={field.name}
          />
        )}

        {error ? (
          <label className="text-sm text-important">{error}</label>
        ) : null}
      </div>
    </div>
  )
}

export default InputField

import { useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = {
  name: string
  type?: string
  label?: string
  validate?: (value: any) => undefined | string | Promise<any>
} & InputHTMLAttributes<HTMLInputElement>

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props)
  return (
    <div className="mb-6 md:flex md:items-center">
      <div className="md:w-1/3">
        <label
          className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
          htmlFor={field.name}
        >
          {props.label}
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
          {...field}
          {...props}
          id={field.name}
        />
        {error ? <label className="bg-red-500">{error}</label> : null}
      </div>
    </div>
  )
}

export default InputField

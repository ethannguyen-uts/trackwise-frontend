const isEmptyString = (value: string): string => {
  if (!value) {
    return 'Required'
  }
  return ''
}

const validateUsername = (value: string): string => {
  let error = ''
  const regex = new RegExp(
    `^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$`
  )
  if (!value) {
    error = 'Required'
  } else if (!regex.test(value)) {
    error = 'Invalid user name'
  }
  return error
}

const validateEmail = (value: string): string => {
  let error = ''
  if (!value) {
    error = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address'
  }
  return error
}

const validatePassword = (value: any): string => {
  let error = ''
  const regex = new RegExp(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
  )
  if (!value) {
    error = 'Required'
  } else if (!regex.test(value)) {
    error =
      'Password length must have at least 8 characters and contain one number and one special character'
  }
  return error
}

export { isEmptyString, validateEmail, validatePassword, validateUsername }

export function toErrorMap(data: Record<string, string>[]) {
  const errorMap: Record<string, string> = {}
  if (data) {
    data.forEach(({ fieldName, errorMessage }) => {
      errorMap[fieldName] = errorMessage
    })
  }
  return errorMap
}

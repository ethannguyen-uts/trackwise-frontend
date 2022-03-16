export function toErrorMap(data: Record<string, string>[]) {
  const errorMap: Record<string, string> = {}
  if (data) {
    data.forEach(({ field, error }) => {
      errorMap[field] = error
    })
  }
  console.log(errorMap)
  return errorMap
}

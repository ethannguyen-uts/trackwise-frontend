import { GraphQLError } from 'graphql'
import { toErrorMap } from './toErrorMap'

export const getGraphqlErrors = (
  graphqlErrors: GraphQLError[]
): Record<string, string> | null => {
  let data: Record<string, string>[] | null
  data = null
  //valiation Errors

  const hasValidationErrors = graphqlErrors.find((item: GraphQLError) => {
    return (
      item.extensions.exception &&
      (item.extensions.exception as any).validationErrors
    )
  })
  if (hasValidationErrors) {
    const validationErrors = (hasValidationErrors.extensions.exception as any)
      .validationErrors
    console.log(validationErrors)
    data = validationErrors!.map((item: any) => {
      const fieldName = item.property as string
      const errorMessage = Object.values(item.constraints).concat()[0] as string
      return { field: fieldName, error: errorMessage }
    })
    console.log(data)
  }

  if (data) return toErrorMap(data)
  return null
}

import { GraphQLError } from 'graphql'
import { toErrorMap } from './toErrorMap'

export const getGraphqlErrors = (
  graphqlErrors: GraphQLError[]
): Record<string, string> | null => {
  let data: Record<string, string>[] | null
  data = null
  //valiation Errors
  const validationErrors = graphqlErrors.filter((item: GraphQLError) => {
    return (
      item.extensions.exception &&
      (item.extensions.exception as any).validationErrors
    )
  })
  if (validationErrors) {
    data = validationErrors!.map((item: any) => {
      const fieldName = item.property as string
      const errorMessage = Object.values(item.constraints).concat()[0] as string
      return { fieldName, errorMessage }
    })
  }
  if (data) return toErrorMap(data)
  return null
}

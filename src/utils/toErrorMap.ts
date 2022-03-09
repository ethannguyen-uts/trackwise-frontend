import { collectTypesFromResponse } from '@urql/core/dist/types/utils'
import { GraphQLError } from 'graphql'

export const toErrorMap = (error: GraphQLError) => {
  let data: Record<string, string>[] | null
  data = null
  if (error.extensions.exception) {
    const ex = error.extensions.exception as unknown as any

    data = ex.validationErrors.map((item: any) => {
      const fieldName = item.property as unknown as string
      const errorMessage = Object.values(
        item.constraints
      ).concat()[0] as unknown as string

      return { fieldName, errorMessage }
    })
  }
  const errorMap: Record<string, string> = {}
  if (data) {
    data.forEach(({ fieldName, errorMessage }) => {
      errorMap[fieldName] = errorMessage
    })
  }
  return errorMap
}

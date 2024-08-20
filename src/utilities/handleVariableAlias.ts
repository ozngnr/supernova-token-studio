import { tokenExportKeyType } from '@typings/tokenExportKey'
import { tokenTypes } from '@config/tokenTypes'

import { getVariableTypeByValue } from '../../src/utilities/getVariableTypeByValue'
import { changeNotation } from '../../src/utilities/changeNotation'

function handleVariableAlias(variable, value, mode) {
  const resolvedAlias = figma.variables.getVariableById(value.id)
  console.log(resolvedAlias.name)
  const collection = figma.variables.getVariableCollectionById(
    resolvedAlias.variableCollectionId
  )
  return {
    description: variable.description || undefined,
    exportKey: tokenTypes.variables.key as tokenExportKeyType,
    category: getVariableTypeByValue(
      Object.values(resolvedAlias.valuesByMode)[0]
    ),
    values: `{${collection.name}.${resolvedAlias.name}}`,

    // this is being stored so we can properly update the design tokens later to account for all
    // modes when using aliases
    aliasCollectionName: collection.name,
    aliasMode: mode,
  }
}

export default handleVariableAlias

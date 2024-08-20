const returnOrThrow = (convertedString, originalString, stringCase) => {
  // return converted string if successful
  if (typeof convertedString === 'string' && convertedString !== '') {
    return convertedString
  }
  // throw error
  throw new Error(
    `converting "${originalString}" to ${stringCase}, resulting in "${convertedString}"`
  )
}

const toCamelCase = (string: string) => {
  const convertedString: string = string
    .trim()
    .replace(/['"]/g, '') // Remove any single or double quotes
    .replace(/([-_ ]){1,}/g, ' ') // Replace dashes, underscores, or spaces with a single space
    .replace(/\W+/g, ' ') // Remove any non-word characters
    .replace(/^\w/, (c) => c.toLowerCase()) // Convert the first letter to lowercase
    .replace(/ (.)/g, (match, group1) => group1.toUpperCase()) // Capitalize the first letter after each space
    .replace(/ /g, '') // Remove all spaces

  // return or throw
  return returnOrThrow(convertedString, string, 'camelCase')
}

const toKebabCase = (string: string) => {
  const convertedString = string
    .replace(/['"]/g, '') // Remove any single or double quotes
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
    .replace(/([-_ ]){1,}/g, ' ') // Replace dashes, underscores, or spaces with a single space
    .replace(/\W+/g, ' ') // Remove any non-word characters
    .trim() // Trim leading and trailing spaces
    .toLowerCase() // Convert the entire string to lowercase
    .replace(/ /g, '-') // Replace spaces with hyphens

  // return or throw
  return returnOrThrow(convertedString, string, 'kebabCase')
}

const transformName = (name, nameConversion = 'default') => {
  // if camelCase
  if (nameConversion === 'camelCase') {
    return toCamelCase(name)
  }
  // if kebabCase
  if (nameConversion === 'kebabCase') {
    return toKebabCase(name)
  }
  return name.trim()
}
export default transformName
export const __testing = {
  toCamelCase: toCamelCase,
  toKebabCase: toKebabCase,
}

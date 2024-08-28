export const returnOrThrow = (convertedString, originalString, stringCase) => {
  // return converted string if successful
  if (typeof convertedString === 'string' && convertedString !== '') {
    return convertedString
  }
  // throw error
  throw new Error(
    `converting "${originalString}" to ${stringCase}, resulting in "${convertedString}"`
  )
}

export const toCamelCase = (string: string) => {
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

export const toKebabCase = (string: string) => {
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
  // Replace numbers with letters
  const convertedName = name.replace(
    /^(\d+)(x)/g,
    (match, p1, p2) => p2.repeat(parseInt(p1) - 1) + p2
  )
  // if camelCase
  if (nameConversion === 'camelCase') {
    return toCamelCase(convertedName)
  }
  // if kebabCase
  if (nameConversion === 'kebabCase') {
    return toKebabCase(convertedName)
  }
  return convertedName.trim().toLowerCase()
}
export default transformName
export const __testing = {
  toCamelCase: toCamelCase,
  toKebabCase: toKebabCase,
}

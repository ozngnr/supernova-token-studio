const processAliasModes = (variables) => {
  return variables.reduce((collector, variable) => {
    // only one mode will be passed in if any
    if (!variable.aliasMode) {
      collector.push(variable)

      return collector
    }

    if (
      variable.aliasMode.name === 'dark' ||
      variable.aliasMode.name === 'light'
    ) {
      if (variable.values.includes('theme')) {
        variable.values = variable.values.replace(
          'theme',
          `theme.${variable.aliasMode.name}`
        )
      }
    }
    // console.log(variable)
    // alias mode singular because only one is shown
    const { aliasMode, aliasCollectionName } = variable

    // this was only added for this function to process that data so before we return the variables, we can remove it
    delete variable.aliasMode
    delete variable.aliasCollectionName

    collector.push({
      ...variable,
      values: variable.values,
    })

    return collector
  }, [])
}

export default processAliasModes

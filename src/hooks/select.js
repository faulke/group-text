import React, { useState, useEffect } from 'react'
import { Box } from 'grommet'

/**
 * Applies search to suggestions and returns results
 * @param {Array} options the suggestions
 * @param {String} search the search query
 * @param {String} searchKey key of the object where search should be applied, e.g. "name"
 */
const withSearchApplied = (options, search, searchKey) => {
  return options
    .filter((option) => {
      return option[searchKey].toLowerCase().includes(search.toLowerCase())
    })
    .map((option) => ({
      label: <Box pad="xsmall">{option[searchKey]}</Box>,
      value: option.id
    }))
}

/**
 * A custom hook for updating suggestion in a TagSelect component
 * @param {Array} options the options used for suggestions
 * @param {Array} values the currently selected options
 * @param {String} searchKey key of the object where search should be applied, e.g. "name"
 */
export const useSuggestions = (options = [], values = [], searchKey) => {
  const [suggestions, setSuggestions] = useState(options)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getSuggestions = () => {
      const optionIds = options.map(x => x.id)
      const suggIds = values.map(x => x.value)
      const suggs = optionIds.filter(x => !suggIds.includes(x))
      const beforeSearch = options.filter(x => suggs.includes(x.id))
      setSuggestions(withSearchApplied(beforeSearch, search, searchKey))
    }
    getSuggestions()
  }, [values.length, search])

  return {
    /**
     * A function that's called when a selected option is removed
     * @param {Function} setter function that sets the new selected options after removal
     * @param {Number} index index of the removed option
     */
    onRemove: (setter, index) => {
      const newValues = [...values]
      newValues.splice(index, 1)
      setter(newValues)
    },
    suggestions,
    search,
    setSearch
  }
}

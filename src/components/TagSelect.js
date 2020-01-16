import React from 'react'
import { Box, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import Tag from './Tag'
import { useSuggestions } from '../hooks/select'

const TagSelect = ({
  options = [],
  value = [],
  placeholder = 'Select tags',
  searchKey = 'name',
  onChange
}) => {
  const {
    suggestions,
    search,
    setSearch,
    onRemove
  } = useSuggestions(options, value, searchKey)

  const renderTags = (tags) => (
    <Box align="center" direction="row" wrap pad={{ left: 'xsmall' }}>
      {tags.map((tag, index) => (
        <Tag key={`tag-${tag.id}`} onRemove={() => onRemove(onChange, index)}>
          {tag.label}
        </Tag>
      ))}
    </Box>
  )

  return (
    <Box
      wrap
      direction="row"
      align="center"
      border="all"
      round="xsmall"
      pad="xxsmall"
    >
      { value.length > 0 && renderTags(value) }
      <Box
        alignSelf="stretch"
        align="start"
        flex
        style={{ minWidth: '240px' }}
      >
        <TextInput
          plain
          placeholder={placeholder}
          type="search"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          onSelect={({ suggestion }) => {
            setSearch('')
            onChange([...value, suggestion])
          }}
          suggestions={suggestions}
        />
      </Box>
    </Box>
  )
}

TagSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  searchKey: PropTypes.string
}

TagSelect.defaultProps = {
  options: [],
  value: [],
  placeholder: '',
  searchKey: 'name'
}

export default TagSelect

import React, { useState } from 'react'
import { Box, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import Tag from './Tag'

const TagSelect = ({
  suggestions = [],
  value = [],
  placeholder = 'Select tags',
  searchKey = 'name',
  onChange,
  onRemove
}) => {
  const [search, setSearch] = useState('')

  const renderTags = (tags, onRemove) => (
    <Box align="center" direction="row" wrap={true} pad={{ left: 'xsmall' }}>
      {tags.map((tag, index) => (
        <Tag key={index} onRemove={() => onRemove(index)}>
          {tag.label}
        </Tag>
      ))}
    </Box>
  )

  return (
    <Box
      wrap={true}
      direction="row"
      align="center"
      border="all"
      round="xsmall"
      pad="xxsmall"
    >
      { value.length > 0 && renderTags(value, onRemove) }
      <Box
        alignSelf="stretch"
        align="start"
        flex={true}
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
            onChange({ value: [ ...value, suggestion ] })
          }}
          suggestions={
            suggestions
              .filter((x) => {
                return x[searchKey].toLowerCase().includes(search.toLowerCase())
              }).map((x) => ({
                label: <Box pad="xsmall">{x.name}</Box>,
                value: x.id
              }))
          }
        />
      </Box>
    </Box>
  )
}

TagSelect.propTypes = {
  suggestions: PropTypes.array,
  value: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  searchKey: PropTypes.string,
  onRemove: PropTypes.func
}

export default TagSelect

import React from 'react'
import { FormField } from 'grommet'
import PropTypes from 'prop-types'
import TagSelect from './TagSelect'

const GroupSelect = ({ groups = [], value = [], setGroups }) => {
  const getSuggestions = () => {
    const groupIds = groups.map(x => x.id)
    const suggIds = value.map(x => x.value)
    const suggs = groupIds.filter(x => !suggIds.includes(x))
    return groups.filter(x => suggs.includes(x.id))
  }

  const onRemove = (index) => {
    const newGroups = [...value]
    newGroups.splice(index, 1)
    setGroups(newGroups)
  }

  return (
    <FormField
      label="Groups"
      name="groups"
      component={({ ...props }) => {
        return (
          <TagSelect
            suggestions={getSuggestions()}
            placeholder="Select group(s)"
            onRemove={onRemove}
            value={value}
            {...props}
          />
        )
      }}
      onChange={(target) => setGroups(target.value)}
    />
  )
}

GroupSelect.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.arrayOf(PropTypes.object),
  setGroups: PropTypes.func.isRequired
}

GroupSelect.defaultProps = {
  groups: [],
  value: []
}

export default GroupSelect

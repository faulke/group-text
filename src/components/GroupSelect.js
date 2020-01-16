import React from 'react'
import { FormField } from 'grommet'
import PropTypes from 'prop-types'
import TagSelect from './TagSelect'

const GroupSelect = ({ groups = [], value = [], setGroups, ...props }) => (
  <FormField
    label="Groups"
    name="groups"
  >
    <TagSelect
      options={groups}
      placeholder="Select group(s)"
      value={value}
      onChange={setGroups}
      {...props}
    />
  </FormField>
)

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

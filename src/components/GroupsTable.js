import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Button,
} from 'grommet'
import {
  Trash,
  Edit
} from 'grommet-icons'
import PropTypes from 'prop-types'
import Table from './theme/table/Table'
import TableColumn from './theme/table/TableColumn'

const GroupsTable = ({
  groups = [],
  loading = false,
  saving = false,
  deletingGroup
}) => (
  <Table data={groups} loading={loading}>
    <TableColumn name="name" label="Name">
      {
        ({ id, name }) => (
          <NavLink to={`/groups/${id}`}>
            {name}
          </NavLink>
        )
      }
    </TableColumn>
    <TableColumn name="description" label="Description">
      {
        ({ description }) => (description || 'n/a')
      }
    </TableColumn>
    <TableColumn name="numContacts" label="Contacts">
      {
        ({ numContacts }) => numContacts || 0
      }
    </TableColumn>
    <TableColumn name="actions">
      {
        (group) => (
          <Box direction="row" justify="center" pad="small">
            <Button
              plain
              a11yTitle="Edit group"
              icon={<Edit />}
              margin={{ horizontal: 'small' }}
              disabled={saving}
            />
            <Button
              plain
              a11yTitle="Delete group"
              icon={<Trash />}
              margin={{ horizontal: 'small' }}
              onClick={() => deletingGroup(group)}
              disabled={saving}
            />
          </Box>
        )
      }
    </TableColumn>
  </Table>
)

GroupsTable.propTypes = {
  groups: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  saving: PropTypes.bool,
  deletingGroup: PropTypes.func.isRequired
}

GroupsTable.defaultProps = {
  loading: false,
  saving: false
}

export default GroupsTable

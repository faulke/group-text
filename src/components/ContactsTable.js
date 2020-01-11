import React from 'react'
import {
  Box,
  Text,
  Button,
  Anchor
} from 'grommet'
import {
  Trash,
  Edit
} from 'grommet-icons'
import PropTypes from 'prop-types'
import Table from './theme/table/Table'
import TableColumn from './theme/table/TableColumn'
import {
  CONTACT_ACTIVE,
  CONTACT_OPTOUT
} from '../data/constants'

const ContactsTable = ({ contacts = [], showGroups = true, loading = false }) => {
  const getStatusColor = (statusId) => {
    if (statusId === CONTACT_ACTIVE) {
      return 'status-ok'
    } else if (statusId === CONTACT_OPTOUT) {
      return 'status-warning'
    }
    return 'status-unknown'
  }

  return (
    <Table data={contacts} loading={loading}>
      <TableColumn name="name" label="Name" />
      <TableColumn name="phone" label="Phone Number" sortFunc={({ number }) => number.friendly_name}>
        {
          ({ number }) => (
            <Anchor href={`tel:${number.phone_number}`} label={number.friendly_name} />
          )
        }
      </TableColumn>
      {
        showGroups && (
          <TableColumn name="numGroups" label="Groups" />
        )
      }
      <TableColumn name="status" label="Status" sortFunc={({ status }) => status.id}>
        {
          ({ status }) => (
            <Box
              background={getStatusColor(status.id)}
              direction="row"
              align="center"
              justify="center"
              round="xsmall"
              pad="xsmall"
              gap="xsmall"
              margin="xxsmall"
              width="70px"
            >
              <Text size="small">{status.status}</Text>
            </Box>
          )
        }
      </TableColumn>
      <TableColumn name="actions">
        {
          () => (
            <Box direction="row" justify="center">
              <Button
                plain
                a11yTitle="Edit contact"
                icon={<Edit />}
                margin={{ horizontal: 'small' }}
              />
              <Button
                plain
                a11yTitle="Delete contact"
                icon={<Trash />}
                margin={{ horizontal: 'small' }}
              />
            </Box>
          )
        }
      </TableColumn>
    </Table>
  )
}

ContactsTable.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  showGroups: PropTypes.bool,
  loading: PropTypes.bool
}

ContactsTable.defaultProps = {
  contacts: [],
  showGroups: true,
  loading: false
}

export default ContactsTable

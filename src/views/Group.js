import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Tabs,
  Tab,
  Button,
  Heading,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text
} from 'grommet'
import {
  Edit,
  Trash
} from 'grommet-icons'
import { useGroup } from '../hooks/groups'
import Loading from '../components/Loading'
import AddContactModal from '../components/AddContactModal'
import ContactsTable from '../components/ContactsTable'

const Group = () => {
  const { id } = useParams()
  const { group, loading, error, addContactToGroup } = useGroup(id)
  const [showAddContact, setShowAddContact] = useState(false)

  if (loading) {
    return (
      <Loading absolute />
    )
  }

  return (
    <div className="page-container">
      {
        group && (
          <Box pad="small">
            <Box direction="row-responsive">
              <Box flex="grow">
                <Heading flex level={2}>{group.name}</Heading>
              </Box>
              <Box direction="row">
                <Button
                  plain
                  a11yTitle="Edit group"
                  icon={<Edit />}
                  margin={{ horizontal: 'small' }}
                />
                <Button
                  plain
                  a11yTitle="Delete group"
                  icon={<Trash />}
                  margin={{ horizontal: 'small' }}
                />
              </Box>
            </Box>
            <Box justify="center">
              <Tabs>
                <Tab title="Messages">
                  <Box>
                    <Box direction="row-responsive" pad="small" justify="end">
                      <Button
                        primary
                        label="+ New message"
                      />
                    </Box>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableCell>Message</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Time</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody />
                    </Table>
                  </Box>
                </Tab>
                <Tab title="Contacts">
                  <Box>
                    <Box direction="row" pad="small" justify="end">
                      <Button
                        primary
                        label="+ New contact"
                        onClick={() => setShowAddContact(true)}
                      />
                    </Box>
                    <ContactsTable
                      contacts={group.contacts}
                      loading={loading}
                      showGroups={false}
                    />
                  </Box>
                </Tab>
              </Tabs>
            </Box>
          </Box>
        )
      }
      {
        showAddContact && (
          <AddContactModal
            setShow={setShowAddContact}
            onSubmit={addContactToGroup}
            group={group}
          />
        )
      }
    </div>
  )
}

export default Group

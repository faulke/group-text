import React, { useState } from 'react'
import {
  Box,
  Heading,
  Button
} from 'grommet'
import Loading from '../components/Loading'
import ContactsTable from '../components/ContactsTable'
import AddContactModal from '../components/AddContactModal'
import { useContacts } from '../hooks/contacts'
import { useGroups } from '../hooks/groups'

const Contacts = () => {
  const {
    loading,
    contacts,
    saving,
    addContact
  } = useContacts()
  const { groups } = useGroups()
  const [showAddContact, setShowAddContact] = useState(false)

  return (
    <div className="page-container">
      <Box pad="small">
        <Box direction="row-responsive">
          <Box flex="grow">
            <Heading level={2}>Contacts</Heading>
          </Box>
          <Box>
            <Button
              primary
              label="+ New contact"
              onClick={() => setShowAddContact(true)}
              disabled={saving}
            />
          </Box>
        </Box>
        <Box>
          <ContactsTable contacts={contacts} loading={loading} />
          {
            loading && (<Loading absolute />)
          }
        </Box>
      </Box>
      {
        showAddContact && (
          <AddContactModal
            setShow={setShowAddContact}
            onSubmit={addContact}
            groups={groups}
          />
        )
      }
    </div>
  )
}

export default Contacts

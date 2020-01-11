import React, { useState } from 'react'
import {
  Box,
  Heading,
  Button
} from 'grommet'
import GroupsTable from '../components/GroupsTable'
import AddGroupModal from '../components/AddGroupModal'
import DeleteGroupModal from '../components/DeleteGroupModal'
import { useGroups } from '../hooks/groups'

const Groups = () => {
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [deletingGroup, setDeletingGroup] = useState()
  const {
    groups,
    loading,
    saving,
    addGroup,
    deleteGroup
  } = useGroups()

  return (
    <div className="page-container">
      <Box pad="small">
        <Box direction="row-responsive">
          <Box flex="grow">
            <Heading level={2}>Groups</Heading>
          </Box>
          <Box>
            <Button
              primary
              label="+ New group"
              onClick={() => setShowAddGroup(true)}
              disabled={saving}
            />
          </Box>
        </Box>
        <GroupsTable
          groups={groups}
          loading={loading}
          saving={saving}
          deletingGroup={setDeletingGroup}
        />
      </Box>
      {
        showAddGroup && (
          <AddGroupModal
            setShow={setShowAddGroup}
            onSubmit={(data) => addGroup(data)}
          />
        )
      }
      {
        deletingGroup && (
          <DeleteGroupModal
            setShow={setDeletingGroup}
            group={deletingGroup}
            onDelete={() => deleteGroup(deletingGroup.id)}
          />
        )
      }
    </div>
  )
}

export default Groups

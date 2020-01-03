import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { groups as groupsState } from '../selectors'
import {
  getGroups,
  addGroup,
  deleteGroup
} from '../actions'
import {
  Box,
  Heading,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody
} from 'grommet'
import {
  Edit,
  Trash
} from 'grommet-icons'
import Loading from '../components/Loading'
import AddGroupModal from '../components/AddGroupModal'
import DeleteGroupModal from '../components/DeleteGroupModal'

const Groups = () => {
  const dispatch = useDispatch()
  const { groups, loading, saving } = useSelector(groupsState)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [deletingGroup, setDeletingGroup] = useState()

  useEffect(() => {
    if (!groups) {
      dispatch(getGroups())
    }
  }, [JSON.stringify(groups)])

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
              label="+ Add group"
              onClick={() => setShowAddGroup(true)}
              disabled={saving}
            />
          </Box>
        </Box>
        <Box>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Contacts</TableCell>
                <TableCell />
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                groups && groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>
                      <NavLink
                        to={`/groups/${group.id}`}
                      >{group.name}</NavLink>
                    </TableCell>
                    <TableCell size="medium">
                      {group.description  || 'n/a' }
                    </TableCell>
                    <TableCell>
                      {group.contacts || 0}
                    </TableCell>
                    <TableCell>
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
                          onClick={() => setDeletingGroup(group)}
                          disabled={saving}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
            {
              loading && (<Loading absolute={true} />)
            } 
        </Box>
      </Box>
      {
        showAddGroup && (
          <AddGroupModal
            setShow={setShowAddGroup}
            onSubmit={data => dispatch(addGroup(data))}
          />
        )
      }
      {
        deletingGroup && (
          <DeleteGroupModal
            setShow={setDeletingGroup}
            group={deletingGroup}
            onDelete={() => dispatch(deleteGroup(deletingGroup.id))}
          />
        )
      }
    </div>
  )
}

export default Groups

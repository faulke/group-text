import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { groups as groupsState } from '../selectors'
import { getGroups } from '../actions'
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

const Groups = () => {
  const dispatch = useDispatch()
  const { groups, loading } = useSelector(groupsState)

  useEffect(() => {
    if (!groups) {
      dispatch(getGroups)
    }
  }, [JSON.stringify(groups)])

  if (loading) {
    return (
      <Loading />
    )
  }

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
                  <TableCell>{group.description}</TableCell>
                  <TableCell>{group.contacts || 0}</TableCell>
                  <TableCell>
                    <Box direction="row" justify="center">
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
                  </TableCell>
                </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </Box>
      </Box>

    </div>
  )
}

export default Groups

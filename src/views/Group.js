import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
import { getGroupById } from '../actions'
import { group as groupState } from '../selectors'
import Loading from '../components/Loading'

const Group = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { group, loading, error } = useSelector(groupState)

  useEffect(() => {
    if (id) {
      dispatch(getGroupById(id))
    }
  }, [id])

  if (loading) {
    return (
      <Loading />
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
                      <TableBody>

                      </TableBody>
                    </Table>
                  </Box>
                </Tab>
                <Tab title="Contacts">
                  <Box>
                    <Box direction="row" pad="small" justify="end">
                      <Button
                        primary
                        label="+ New contact"
                      />
                    </Box>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Phone Number</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {
                          group.contacts.map((contact) => (
                            <TableRow key={contact.id}>
                              <TableCell>{contact.name}</TableCell>
                              <TableCell>{contact.phone_number}</TableCell>
                              <TableCell>
                                <Box
                                  background="neutral-1"
                                  direction="row"
                                  align="center"
                                  justify="center"
                                  round="xsmall"
                                  pad="xsmall"
                                  gap="xsmall"
                                  margin="xxsmall"
                                  width="70px"
                                >
                                  <Text size="small">Active</Text>
                                </Box>
                              </TableCell>
                              <TableCell>
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
                              </TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </Box>
                </Tab>
              </Tabs>
            </Box>
          </Box> 
        )
      }

    </div>
  )
}

export default Group

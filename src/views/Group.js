import React from 'react'
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
  TableCell
} from 'grommet'
import {
  Edit,
  Trash
} from 'grommet-icons'

const Group = () => {
  const { id } = useParams()

  return (
    <div className="page-container">
      <Box pad="small">
        <Heading level={2}>Group #{id}</Heading>
        <Box justify="center">
          <Tabs>
            <Tab title="Messages">
              <Box>
                <Box direction="row" pad="small" justify="end">
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
                      <TableCell>Total Messages</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHeader>
                  <TableBody>

                  </TableBody>
                </Table>
              </Box>
            </Tab>
          </Tabs>
        </Box>
      </Box>
    </div>
  )
}

export default Group

import React, { useState } from 'react'
import {
  Anchor
} from 'grommet'
import Table from '../components/theme/table/Table'
import TableColumn from '../components/theme/table/TableColumn'

const Beta = () => {
  const data = [
    { id: 1, name: 'Evan', phone: '+13242314950' },
    { id: 2, name: 'Roger', phone: '+12354852948' }
  ]
  const [loading, setLoading] = useState(true)
  setTimeout(() => {
    setLoading(false)
  }, 1000)

  return (
    <Table data={data} loading={loading}>
      <TableColumn name="name" label="Name" />
      <TableColumn name="phone" label="Phone" sortFunc={({ phone }) => phone}>
        {
          ({ phone }) => (
            <Anchor href={`tel:${phone}`} label={phone} />
          )
        }
      </TableColumn>
    </Table>
  )
}

export default Beta

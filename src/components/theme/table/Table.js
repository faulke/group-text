import React, { useState, useEffect } from 'react'
import {
  Table as GrommetTable,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box
} from 'grommet'
import {
  CaretUp,
  CaretDown
} from 'grommet-icons'
import PropTypes from 'prop-types'
import Loading from '../../Loading'
import TableColumn from './TableColumn'

const Table = ({
  data = [],
  loading = false,
  children
}) => {
  const cols = children
    .filter(x => x && x.type.name === TableColumn.name)
    .map((col) => {
      return {
        ...col,
        sort: 'asc'
      }
    })

  const [columns, setCols] = useState(cols)
  const [sort, setSort] = useState({ index: null, dir: 'asc' })
  const [tableData, setTableData] = useState([])

  const sortData = (col, dir) => {
    const { name, sortFunc } = col.props
    const compare = (a, b) => {
      let a1 = sortFunc ? sortFunc(a) : a[name]
      let b1 = sortFunc ? sortFunc(b) : b[name]

      a1 = typeof a1 === 'string' ? a1.toLowerCase() : a1
      b1 = typeof b1 === 'string' ? b1.toLowerCase() : b1

      if (a1 < b1) {
        return -1
      } else if (a1 > b1) {
        return 1
      }
      return 0
    }

    const newData = tableData
    newData.sort(compare)

    if (dir === 'desc') {
      newData.reverse()
    }

    setTableData(newData)
  }

  const sortColumn = (index, col) => {
    const newDir = col.sort === 'asc' ? 'desc' : 'asc'
    const newCol = {
      ...col,
      sort: newDir
    }
    const newCols = columns.map((x, i) => {
      if (i === index) {
        return newCol
      }
      return x
    })

    setCols(newCols)
    sortData(col, newDir)
    setSort({ index, dir: newDir })
  }

  const renderSort = (index, col) => {
    if (sort.index === index) {
      if (col.sort === 'asc') {
        return (<CaretUp size="small" />)
      }
      return (<CaretDown size="small" />)
    }
    return (
      <CaretUp
        size="small"
        style={{ visibility: 'hidden' }}
      />
    )
  }

  const renderCell = (row, col) => {
    const elem = col.props.children
      ? col.props.children(row)
      : row[col.props.name]
    return elem
  }


  useEffect(() => {
    const setData = () => {
      setTableData(data)
    }
    setData()
  }, [JSON.stringify(data), sort])

  return (
    <Box fill>
      {
        loading && (<Loading absolute />)
      }
      <GrommetTable>
        <TableHeader>
          <TableRow>
            {
              columns.map((col, i) => (
                <TableCell key={`header-${i + 1}`}>
                  {
                    col.props.name || col.props.sortFunc ? (
                      <Button
                        plain
                        pad="small"
                        onClick={() => sortColumn(i, col)}
                      >
                        <Box direction="row">
                          <Box>
                            {col.props.label}
                          </Box>
                          <Box pad={{ horizontal: 'small' }} justify="center">
                            {renderSort(i, col)}
                          </Box>
                        </Box>
                      </Button>
                    ) : null
                  }
                </TableCell>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            tableData.map((row) => (
              <TableRow key={row.id}>
                {
                  columns.map((col, i) => (
                    <TableCell key={`row-${row.id}-cell-${i + 1}`}>
                      {renderCell(row, col)}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </GrommetTable>
    </Box>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

Table.defaultProps = {
  loading: false
}

export default Table

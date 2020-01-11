import React from 'react'
import PropTypes from 'prop-types'

const TableColumn = ({
  name,
  label,
  sortFunc
}) => {
  return null
}

TableColumn.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  sortFunc: PropTypes.func
}

export default TableColumn

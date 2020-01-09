import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Button } from 'grommet'

const RoutedButton = ({ active, location, history, path, ...rest }) => {
  const handleClick = (event) => {
    event.preventDefault()
    history.push(path)
  }
  return (
    <Button
      active={active}
      onClick={handleClick}
      {...rest}
    />
  )
}

RoutedButton.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool
}

export default withRouter(RoutedButton)

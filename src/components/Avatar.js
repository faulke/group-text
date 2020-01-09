import React from 'react'
import { Box } from 'grommet'
import PropTypes from 'prop-types'

const Avatar = ({ name, url, ...rest }) => (
  <Box
    a11yTitle={`${name} avatar`}
    height="46px"
    width="46px"
    round="full"
    background={`url(${url})`}
    {...rest}
  />
)

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Avatar

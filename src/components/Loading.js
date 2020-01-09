import React from 'react'
import PropTypes from 'prop-types'
import loading from '../assets/loading.svg'

const Loading = ({ absolute = false }) => (
  <div className={`spinner ${absolute ? 'absolute' : ''}`}>
    <img src={loading} alt="Loading" />
  </div>
)

Loading.propTypes = {
  absolute: PropTypes.bool
}

export default Loading

import React from 'react'
import { MaskedInput } from 'grommet'
import PropTypes from 'prop-types'

const PhoneInput = ({ name, value = '', onChange }) => {
  return (
    <MaskedInput
      name={name}
      mask={[
        { fixed: '(' },
        {
          length: 3,
          regexp: /^[0-9]{1,3}$/,
          placeholder: 'xxx'
        },
        { fixed: ')' },
        { fixed: ' ' },
        {
          length: 3,
          regexp: /^[0-9]{1,3}$/,
          placeholder: 'xxx'
        },
        { fixed: '-' },
        {
          length: 4,
          regexp: /^[0-9]{1,4}$/,
          placeholder: 'xxxx'
        }
      ]}
      value={value}
      onChange={onChange}
    />
  )
}

PhoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default PhoneInput

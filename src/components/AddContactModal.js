import React, { useState } from 'react'
import {
  Box,
  Button,
  Layer,
  Form,
  FormField,
  Heading
} from 'grommet'
import {
  Close
} from 'grommet-icons'
import PropTypes from 'prop-types'
import PhoneInput from './PhoneInput'
import GroupSelect from './GroupSelect'

const AddContactModal = ({ setShow, onSubmit, group, groups = [] }) => {
  const [values, setValues] = useState({
    name: '',
    phone_number: '',
    groups: group ? [{ value: group.id }] : []
  })

  const submit = (e) => {
    e.preventDefault()
    onSubmit(e.value)
    setShow(false)
  }

  const setGroups = (newGroups) => {
    setValues({ ...values, groups: newGroups })
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setValues({
      ...values,
      [name]: value
    })
  }

  return (
    <Layer
      modal
      plain={false}
      onEsc={() => setShow(false)}
      onClickOutside={() => setShow(false)}
    >
      <Box pad="medium" width={{ min: '400px' }}>
        <Box direction="row" justify="end" alignContent="center">
          <Button
            plain
            icon={<Close />}
            onClick={() => setShow(false)}
          />
        </Box>
        <Box>
          <Heading level={3}>
            Add Contact
            {
              group && (` to ${group.name}`)
            }
          </Heading>
        </Box>
        <Form
          value={values}
          messages={{ required: 'Field is required.' }}
          onSubmit={submit}
        >
          <FormField
            label="Name"
            name="name"
            placeholder="Add contact name"
            onChange={handleChange}
            value={values.name}
            required
          />
          <FormField
            label="Phone Number"
            name="phone_number"
            component={PhoneInput}
            onChange={handleChange}
            value={values.phone_number}
            validate={{
              regexp: /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/,
              message: 'Invalid phone number.'
            }}
            required
          />
          {
            !group && groups.length > 0 && (
              <GroupSelect
                groups={groups}
                value={values.groups}
                setGroups={setGroups}
              />
            )
          }
          <Button
            primary
            type="submit"
            label="Save"
          />
        </Form>
      </Box>
    </Layer>
  )
}

AddContactModal.propTypes = {
  setShow: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object),
  group: PropTypes.object
}

AddContactModal.defaultProps = {
  groups: [],
  group: null
}

export default AddContactModal

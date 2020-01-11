import React, { useState } from 'react'
import {
  Box,
  Button,
  Layer,
  Form,
  FormField,
  Heading,
  TextArea
} from 'grommet'
import {
  Close
} from 'grommet-icons'
import PropTypes from 'prop-types'

const AddGroupModal = ({ setShow, onSubmit }) => {
  const [values] = useState({
    name: '',
    description: ''
  })

  const submit = (e) => {
    e.preventDefault()
    onSubmit(e.value)
    setShow(false)
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
          <Heading level={3}>Add Group</Heading>
        </Box>
        <Form
          value={values}
          messages={{ required: 'Field is required.' }}
          onSubmit={submit}
        >
          <FormField
            label="Group Name"
            name="name"
            placeholder="Add group name"
            required
          />
          <FormField
            label="Description"
            name="description"
            placeholder="Add description"
            component={TextArea}
          />
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

AddGroupModal.propTypes = {
  setShow: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default AddGroupModal

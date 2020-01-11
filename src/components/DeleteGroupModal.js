import React from 'react'
import {
  Box,
  Button,
  Layer,
  Heading,
  Paragraph
} from 'grommet'
import { Close } from 'grommet-icons'
import PropTypes from 'prop-types'

const DeleteGroupModal = ({ setShow, onDelete, group = {} }) => {
  const deleteGroup = () => {
    onDelete()
    setShow(null)
  }

  return (
    <Layer
      modal
      plain={false}
      onEsc={() => setShow(null)}
      onClickOutside={() => setShow(null)}
    >
      <Box pad="medium" width={{ min: '400px' }}>
        <Box direction="row" justify="end" alignContent="center">
          <Button
            plain
            icon={<Close />}
            onClick={() => setShow(null)}
          />
        </Box>
        <Box>
          <Heading level={3}>
            Delete {group.name}
          </Heading>
        </Box>
        <Box>
          <Box pad={{ vertical: 'small' }}>
            <Paragraph>
              Are you sure you want to delete this group?
            </Paragraph>
          </Box>
          <Box direction="row">
            <Button
              primary
              color="status-critical"
              label="Delete"
              onClick={deleteGroup}
            />
          </Box>
        </Box>
      </Box>
    </Layer>
  )
}

DeleteGroupModal.propTypes = {
  setShow: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  group: PropTypes.object
}

DeleteGroupModal.defaultProps = {
  group: {}
}

export default DeleteGroupModal

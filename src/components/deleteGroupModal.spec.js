import React from 'react'
import { shallow, mount } from 'enzyme'
import {
  Button,
  Heading
} from 'grommet'
import DeleteGroupModal from './DeleteGroupModal'

describe('DeleteGroupModal', () => {
  const group = {
    name: 'Test group'
  }
  const mockOnDelete = jest.fn()
  const mockSetShow = jest.fn()
  let wrapper

  beforeEach(() => {
    mockOnDelete.mockClear()
    mockSetShow.mockClear()

    wrapper = mount(
      <DeleteGroupModal
        onDelete={mockOnDelete}
        setShow={mockSetShow}
        group={group}
      />
    )
  })

  it('should be an element', () => {
    expect(wrapper).toExist()
  })

  it('should close modal on close btn click', () => {
    wrapper.find(Button).first().simulate('click')
    expect(mockSetShow).toHaveBeenCalledWith(null)
  })

  it('should show group name in heading text', () => {
    const heading = wrapper.find(Heading)
    expect(heading.text()).toMatch(group.name)
  })

  it('should call onDelete and close modal when delete btn clicked', () => {
    wrapper = shallow(
      <DeleteGroupModal
        onDelete={mockOnDelete}
        setShow={mockSetShow}
        group={group}
      />
    )

    wrapper.find(Button).last().simulate('click')
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockSetShow).toHaveBeenCalledWith(null)
  })
})

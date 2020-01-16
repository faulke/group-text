import React from 'react'
import { shallow, mount } from 'enzyme'
import {
  Form,
  Button
} from 'grommet'
import AddGroupModal from './AddGroupModal'

describe('AddGroupModal', () => {
  const mockOnSubmit = jest.fn()
  const mockSetShow = jest.fn()
  let wrapper

  beforeEach(() => {
    mockOnSubmit.mockClear()
    mockSetShow.mockClear()

    wrapper = mount(
      <AddGroupModal
        onSubmit={mockOnSubmit}
        setShow={mockSetShow}
      />
    )
  })

  it('should be an element', () => {
    expect(wrapper).toExist()
  })

  it('should close modal on close btn click', () => {
    wrapper.find(Button).first().simulate('click')
    expect(mockSetShow).toHaveBeenCalledWith(false)
  })

  it('should call onSubmit when form submitted', () => {
    wrapper = shallow(
      <AddGroupModal
        onSubmit={mockOnSubmit}
        setShow={mockSetShow}
      />
    )

    wrapper.find(Form).simulate('submit', {
      value: 'values',
      preventDefault: () => ''
    })
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })
})

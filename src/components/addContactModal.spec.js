import React from 'react'
import { shallow, mount } from 'enzyme'
import {
  Form,
  Button
} from 'grommet'
import AddContactModal from './AddContactModal'
import GroupSelect from './GroupSelect'

describe('AddContactModal', () => {
  const mockOnSubmit = jest.fn()
  const mockSetShow = jest.fn()
  const group = { name: 'test' }
  let wrapper

  beforeEach(() => {
    mockOnSubmit.mockClear()
    mockSetShow.mockClear()

    wrapper = mount(
      <AddContactModal
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

  it('should show group name when group prop is set', () => {
    wrapper.setProps({ group })
    expect(wrapper.find('h3')).toIncludeText(group.name)
  })

  it('should show group selecter if groups prop set', () => {
    wrapper.setProps({ groups: [group] })
    expect(wrapper.find(GroupSelect)).toExist()
  })

  it('should call onSubmit when form submitted', () => {
    // use shallow to avoid form validation issues
    wrapper = shallow(
      <AddContactModal
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

import React from 'react'
import { mount } from 'enzyme'
import {
  FormField,
  Grommet
} from 'grommet'
import GroupSelect from './GroupSelect'
import TagSelect from './TagSelect'

describe('GroupSelect', () => {
  const groups = [{ id: 1, name: 'hello' }, { id: 2, name: 'test' }]
  const value = []
  const mockSetGroups = jest.fn()
  let wrapper

  beforeEach(() => {
    mockSetGroups.mockReset()
    wrapper = mount(
      <Grommet>
        <GroupSelect
          groups={groups}
          value={value}
          setGroups={mockSetGroups}
        />
      </Grommet>
    )
  })

  it('should be an element', () => {
    const select = wrapper.find(GroupSelect)
    expect(select).toExist()
  })

  it('should show a form field heading', () => {
    const formField = wrapper.find(FormField)
    expect(formField).toHaveText('Groups')
  })

  it('should set initial select options', () => {
    const select = wrapper.find(TagSelect)
    expect(select.props().options).toEqual(groups)
  })

  it('should set groups on tag select or remove', () => {
    const select = wrapper.find(TagSelect)
    select.props().onChange([groups[1]])
    expect(mockSetGroups).toHaveBeenCalledWith([groups[1]])
  })
})

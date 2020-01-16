import React from 'react'
import { mount } from 'enzyme'
import { Box } from 'grommet'
import Avatar from './Avatar'

describe('Avatar', () => {
  const url = '../../public/favicon.ico'
  const name = 'Test Name'
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <Avatar
        name={name}
        url={url}
      />
    )
  })

  it('should be an element', () => {
    expect(wrapper).toExist()
  })

  it('should render box with provided props', () => {
    const box = wrapper.find(Box)
    expect(box.props().background).toMatch(url)
    expect(box.props().a11yTitle).toMatch(name)
  })
})

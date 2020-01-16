import React from 'react'
import { mount } from 'enzyme'
import {
  Anchor,
  Box,
  Button,
} from 'grommet'
import ContactsTable from './ContactsTable'
import Table from './theme/table/Table'

describe('ContactsTable', () => {
  const contacts = [
    {
      id: 1,
      name: 'Test 1',
      number: {
        phone_number: '+13049304044',
        friendly_name: '(304) 930-4044'
      },
      numGroups: 3,
      status: {
        id: 1,
        status: 'Active'
      }
    }
  ]

  const showGroups = true
  const loading = false
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <ContactsTable
        contacts={contacts}
        showGroups={showGroups}
        loading={loading}
      />
    )
  })

  it('should be an element', () => {
    expect(wrapper).toExist()
  })

  it('should render phone number as anchor', () => {
    const phone = wrapper.find(Anchor).first()
    const contact = contacts[0]
    expect(phone).toExist()
    expect(phone.props().href).toMatch(contact.number.phone_number)
    expect(phone).toHaveText(contact.number.friendly_name)
  })

  it('should render status color', () => {
    const box = wrapper.findWhere(node => !!node.props().background).first()
    expect(box.props().background).toMatch('status-ok')
  })

  it('should render action buttons', () => {
    const box = wrapper.find(Box).last()
    const edit = box.find(Button).first()
    const del = box.find(Button).last()
    expect(edit).toExist()
    expect(del).toExist()
  })
})

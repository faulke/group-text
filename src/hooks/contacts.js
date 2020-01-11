import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '../react-auth0-spa'
import {
  contacts as contactsState
} from '../selectors'
import {
  getContacts,
  addContact
} from '../actions'

export const useContacts = () => {
  const { getTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const { contacts, loading } = useSelector(contactsState)

  useEffect(() => {
    const fetchContacts = async () => {
      const token = await getTokenSilently()
      dispatch(getContacts(token))
    }
    fetchContacts()
  }, [])

  return {
    contacts,
    loading,
    addContact: async (contact) => {
      const token = await getTokenSilently()
      dispatch(addContact(token, contact))
    }
  }
}

export const useContact = () => {

}

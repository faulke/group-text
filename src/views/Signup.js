import React, { useState } from 'react'
import {
  Box,
  Button,
  Form,
  FormField,
  Heading
} from 'grommet'
import PhoneInput from '../components/PhoneInput'
import { useSignup } from '../hooks/account'

const Signup = () => {
  const [values] = useState({
    name: '',
    number: ''
  })
  const { signUp } = useSignup()

  const submit = (e) => {
    e.preventDefault()
    signUp(e.value)
  }

  return (
    <Box direction="row-responsive" justify="center">
      <Box>
        <Heading>Almost there! Complete your registration.</Heading>
        <Form
          values={values}
          messages={{ required: 'Field is required' }}
          onSubmit={submit}
        >
          <FormField
            label="Name"
            name="name"
            placeholder="Your name"
            values={values.name}
            required
          />
          <FormField
            label="Phone Number"
            name="number"
            component={PhoneInput}
            value={values.number}
            validate={{
              regexp: /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/,
              message: 'Invalid phone number.'
            }}
            help="Don't worry, we won't contact you."
            required
          />
          <Button
            primary
            type="submit"
            label="Submit"
            fill={false}
          />
        </Form>
      </Box>
    </Box>
  )
}

export default Signup

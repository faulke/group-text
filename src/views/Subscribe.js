import React, { Fragment, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import {
  Box,
  Grid,
  Button,
  Heading,
  Text,
  Paragraph,
} from 'grommet'
import { StatusGood } from 'grommet-icons'

const Subscribe = () => {
  const { user, getTokenSilently } = useAuth0();
  const stripe = Stripe('pk_test_V7E7AGZxoXcQpcqiPHUuCL5r000x7cVtUV') //eslint-disable-line

  const plans = [
    {
      id: 'plan_G8f2gvSSFPdMPC',
      name: 'Monthly',
      cost: '19.99',
      term: 'month',
      description: 'All available features billed on a recurring monthly basis.'
    },
    {
      id: 'plan_G8f43EJ50rVqgi',
      name: 'Annual',
      cost: '199.99',
      term: 'year',
      description: 'All available features for an entire year.  Cancel any time.'
    }
  ]

  const [plan, setPlan] = useState(plans[1])

  const handleClick = async () => {
    const token = await getTokenSilently();
    const res = await fetch('/v1/checkout/session', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: `{"planId": "${plan.id}", "email":"${user.email}"}`
    })
    const json = await res.json()
    
    await stripe.redirectToCheckout({
      sessionId: json.id
    })
  }

  return (
    <div className="page-container">
      <Box direction="row-responsive" >
        {
          plans.map((option) => (
            <Box
              pad="large"
              fill
              key={option.id}
            >
              <Box
                pad="medium"
                elevation="medium"
                hoverIndicater={true}
                onClick={() => setPlan(option)}
                border={{
                  side: 'all',
                  color: 'brand',
                  size: 'medium',
                  style: option.id === plan.id ? 'solid' : 'hidden'
                }}
              >
                <Box height="xsmall" direction="row">
                  <Box>
                    <Heading level={2}>{ option.name }</Heading>
                  </Box>
                  <Box flex="grow" direction="row" alignContent="end" justify="end">
                    <StatusGood color={option.id === plan.id ? 'brand' : 'light-grey'} />
                  </Box>
                </Box>
                <Paragraph>{ option.description }</Paragraph>
                <Box
                  alignContent="center"
                  justify="center"
                  fill
                >
                  <Text alignSelf="center">You pay</Text>
                  <Text
                    alignSelf="center"
                    size="xxlarge"
                    weight="bold"
                  >
                    ${ option.cost }
                  </Text>
                  <Text alignSelf="center">a { option.term }</Text>
                </Box>
              </Box>
            </Box>
          ))
        }
      </Box>
      <Box
        border="all"
        alignContent="between"
        pad="small"
      >
        <Box border="bottom" pad={{ vertical: 'medium' }}>
          <Text size="large" weight="bold">{plan.name} plan</Text>
          <Text>Billed {plan.term}ly</Text>
          <Text>All features</Text>
        </Box>
        <Box flex border="bottom" alignContent="center" justify="center" pad={{ vertical: 'medium' }}>
          <Text size="large" weight="bold" textAlign="center">${plan.cost}</Text>
        </Box>
        <Box flex alignContent="center" justify="center" pad={{ vertical: 'medium' }}>
          <Button alignSelf="center" primary label="Continue to payment" onClick={handleClick} />
        </Box>
      </Box>
    </div>
  )
}

export default Subscribe

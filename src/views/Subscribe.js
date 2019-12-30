import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getPlans } from '../actions'
import { plans as planState } from '../selectors'
import { useAuth0 } from "../react-auth0-spa";
import {
  Box,
  Button,
  Heading,
  Text,
  Paragraph,
} from 'grommet'
import { StatusGood } from 'grommet-icons'
import Loading from '../components/Loading'

const Subscribe = () => {
  const dispatch = useDispatch()
  const { plans, loading } = useSelector(planState)
  const { user, getTokenSilently } = useAuth0();
  const stripe = Stripe('pk_test_V7E7AGZxoXcQpcqiPHUuCL5r000x7cVtUV') //eslint-disable-line

  const [plan, setPlan] = useState()

  // fetch plans
  useEffect(() => {
    if (!plans.length) {
      dispatch(getPlans)
    } else {
      setPlan(plans[1])
    }
  }, [plans])



  const handleClick = async () => {
    const token = await getTokenSilently();
    const res = await fetch('/v1/checkout/session', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: `{"planId": "${plan.stripe_id}", "email":"${user.email}"}`
    })
    const json = await res.json()
    
    await stripe.redirectToCheckout({
      sessionId: json.id
    })
  }

  if (loading) {
    return (
      <div className="page-container center">
        <Box fill direction="row" alignContent="center" justify="center">
          <Loading />
        </Box>
      </div>
    )
  }

  return (
    <div className="page-container center">
      <Box direction="row-responsive">
        {
          plan && plans.map((option) => (
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
                    ${ option.amount/100 }
                  </Text>
                  <Text alignSelf="center">a { option.interval }</Text>
                </Box>
              </Box>
            </Box>
          ))
        }
      </Box>
      {
        plan && (
          <Box
            border="all"
            alignContent="between"
            pad="small"
          >
            <Box border="bottom" pad={{ vertical: 'medium' }}>
              <Text size="large" weight="bold">{plan.name} plan</Text>
              <Text>Billed {plan.interval}ly</Text>
              <Text>All features</Text>
            </Box>
            <Box flex border="bottom" alignContent="center" justify="center" pad={{ vertical: 'medium' }}>
              <Text size="large" weight="bold" textAlign="center">${plan.amount/100}</Text>
            </Box>
            <Box flex alignContent="center" justify="center" pad={{ vertical: 'medium' }}>
              <Button alignSelf="center" primary label="Continue to payment" onClick={handleClick} />
            </Box>
          </Box>
        )
      }
    </div>
  )
}

export default Subscribe

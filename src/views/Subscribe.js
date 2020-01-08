import React from 'react'
import { usePlans } from '../hooks/plans'
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
  const {
    plans,
    loading,
    plan,
    setPlan,
    checkout
  } = usePlans()

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
              <Button alignSelf="center" primary label="Continue to payment" onClick={checkout} />
            </Box>
          </Box>
        )
      }
    </div>
  )
}

export default Subscribe

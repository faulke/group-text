import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlans } from '../actions'
import { plans as plansState } from '../selectors'
import { useAuth0 } from '../react-auth0-spa'

export const usePlans = () => {
  const dispatch = useDispatch()
  const { plans, loading } = useSelector(plansState)
  const { user, getTokenSilently } = useAuth0()
  const [plan, setPlan] = useState()
  const stripe = Stripe(process.env.REACT_APP_STRIPE_KEY) //eslint-disable-line

  // fetch plans
  useEffect(() => {
    const fetchPlans = async () => {
      if (!plans.length) {
        const token = await getTokenSilently()
        dispatch(getPlans(token))
      } else {
        setPlan(plans[1])
      }
    }
    fetchPlans()
  }, [plans])

  return {
    plans,
    loading,
    plan,
    setPlan,
    checkout: async () => {
      const token = await getTokenSilently()
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
  }
}

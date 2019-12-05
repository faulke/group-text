import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Subscribe = () => {
  const { user, getTokenSilently } = useAuth0();
  const stripe = Stripe('pk_test_V7E7AGZxoXcQpcqiPHUuCL5r000x7cVtUV') //eslint-disable-line
  const handleClick = async (plan) => {
    const token = await getTokenSilently();
    const res = await fetch('/v1/checkout/session', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: `{"planId": "plan_G8f2gvSSFPdMPC", "email":"${user.email}"}`
    })
    const json = await res.json()
    
    await stripe.redirectToCheckout({
      sessionId: json.id
    })
  }
  return (
    <Fragment>
      <div>
        <button className="lead" onClick={() => handleClick('plan_G8f2gvSSFPdMPC')}>
          Monthly Plan
        </button>
        <button className="lead" onClick={() => handleClick('plan_G8f43EJ50rVqgi')}>
          Annual Plan
        </button>
      </div>
    </Fragment>
  )
}

export default Subscribe

import fetch from 'node-fetch'

import stripe from '../../clients/stripe'
import { CONF } from '../../../config/config'

const endpointSecret = CONF('STRIPE_WEBHOOK_SECRET')

export async function post({ body, headers }, res) {
  const sig = headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    res.statusCode = 400
    return res.end(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    if (session.metadata.address) {
      const response = await fetch('https://api.goshippo.com/orders/', {
        method: 'POST',
        headers: {
          'Authorization': `ShippoToken ${CONF('SHIPPO_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to_address: JSON.parse(session.metadata.address),
          notes: session.metadata.note,
          line_items: session.display_items.map(item => ({
            quantity: item.quantity,
            title: item.custom.name,
            total_price: (item.amount / 100).toString(),
            weight: '0.40',
            weight_unit: 'lb'
          })),
          placed_at: new Date().toISOString(),
          order_number: session.payment_intent,
          order_status: 'PAID',
          weight: '0.40',
          weight_unit: 'lb'
        })
      })

      // console.log(await response.text())
    }
  }
  
  res.end(JSON.stringify({ received: true }))
}
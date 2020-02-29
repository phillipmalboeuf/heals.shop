import json from 'json-complete'
import stripe from '../../clients/stripe'

export async function get({ locale, params }, res) {
  const { identifier } = params

  const session = await stripe.checkout.sessions.retrieve(identifier, {
    expand: ['customer', 'payment_intent'],
  })

  console.log(session.metadata.address)

  res.end(json.encode({ checkout: {
    id: session.payment_intent.id,
    email: session.customer_email,
    shipping: JSON.parse(session.metadata.address),
    items: session.display_items.map(item => ({
      total: item.amount / 100,
      title: item.custom.name,
      thumbnail: item.custom.images[0],
      quantity: item.quantity
    })),
    total: session.payment_intent.amount / 100
  } }))
}
import stripe from '../../clients/stripe'

export async function post({ body, headers }, res) {

  const session = await stripe.checkout.sessions.create({
    success_url: `http://${headers.host}/checkout/{CHECKOUT_SESSION_ID}`,
    cancel_url: `http://${headers.host}`,
    payment_method_types: ['card'],
    customer_email: body.email,
    payment_intent_data: {
      receipt_email: body.email,
      shipping: {
        name: body.address.name,
        address: {
          line1: body.address.street1,
          line2: body.address.street2,
          city: body.address.city,
          state: body.address.state,
          postal_code: body.address.zip,
          country: 'CA'
        }
      }
    },
    line_items: body.items.map(item => ({
      name: item.name,
      amount: parseInt(item.price) * 100,
      currency: 'cad',
      quantity: 1,
      images: item.thumbnail && [`https:${item.thumbnail}`]
    })),
    // ...body.subscription && { subscription_data: { items: [{ plan: body.subscription }] } },
    metadata: {
      note: body.note,
      address: JSON.stringify(body.address)
    }
  })

  // console.log(session)

  res.end(JSON.stringify({ session }))
}
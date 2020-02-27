import stripe from '../../clients/stripe'

export async function post({ body, headers }, res) {

  const session = await stripe.checkout.sessions.create({
    success_url: `http://${headers.host}/checkout/{CHECKOUT_SESSION_ID}`,
    cancel_url: `http://${headers.host}`,
    payment_method_types: ['card'],
    customer_email: body.email,
    line_items: body.items.map(item => ({
      name: `${item.title} – ${item.size} – ${item.color}`,
      amount: parseInt(item.price) * 100,
      currency: 'cad',
      quantity: 1,
      images: [`https:${item.thumbnail}`]
    })),
    metadata: {
      note: body.note,
      address: JSON.stringify(body.address)
    }
  })

  // console.log(session)

  res.end(JSON.stringify({ session }))
}
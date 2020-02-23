import stripeClient from 'stripe'
const stripe = stripeClient('sk_test_LCxi3dAujVlOrsB7ClMVhbB900rsF3ssu4')

export async function post({ body, headers }, res) {

  const session = await stripe.checkout.sessions.create({
    success_url: `http://${headers.host}`,
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
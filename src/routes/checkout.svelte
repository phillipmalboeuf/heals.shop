<script context="module">
  import json from 'json-complete'

	export async function preload({ query }) {
    // const res = await this.fetch(`checkout.json`, {
    //   method:'POST',
    //   body: JSON.stringify({
    //     items: JSON.parse(query.items)
    //   }),
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    // })
		// const { session } = JSON.parse(await res.text())
    
		// if (res.status === 200) {
		// 	return { sessionId: session.id }
		// } else {
		// 	this.error(res.status)
		// }

    return { items: json.decode(query.items) }
	}
</script>

<script>
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'

	// export let sessionId
  export let items

  onMount(async ()=> {
    const stripe = await loadStripe('pk_test_rz8eXQl5uOAVXLJrZM4oAkBb003cqy35qz')
    stripe.redirectToCheckout({
      successUrl: 'http://localhost:3000',
      cancelUrl: 'http://localhost:3000',
      items: items.map(item => ({
        sku: 'sku_GlAltw52EpcHPr',
        quantity: 1
      }))
    })
  })
</script>


<h1>Loading checkout...</h1>

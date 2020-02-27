<script context="module">
  import { fade } from 'svelte/transition'
  import { writable } from 'svelte/store'

  export const visible = writable(false)
  export const items = writable([])

  export const addToCart = (sku, size, color, title, price, thumbnail) => {
    items.update(list => {
      list.push({ sku, size, color, title, price, thumbnail })
      return list
    })
  }

  export const removeFromCart = (index) => {
    items.update(list => {
      list.splice(index, 1)
      return list
    })
  }
</script>

<script>
  import json from 'json-complete'
  import Picture from './Picture.svelte'
  import { loadStripe } from '@stripe/stripe-js'

  import { onMount } from 'svelte'

  onMount(()=> {
    const storedItems = sessionStorage.getItem('items')
    if (storedItems) {
      items.set(json.decode(storedItems))
    }

    items.subscribe(list => {
      sessionStorage.setItem('items', json.encode(list))
    })
  })


  let shipping = false


  const hide = () => {
    visible.set(false)
    shipping = false
  }

  const checkout = async (email, address) => {
    // const skus = $items.reduce((_, { sku }) => {
    //   return _[sku]
    //     ? { ..._, [sku]: _[sku] + 1 }
    //     : { ..._, [sku]: 1 }
    // }, {})

    const res = await fetch(`/checkout.json`, {
      method:'POST',
      body: JSON.stringify({
        items: $items,
        email,
        address
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
		const { session } = JSON.parse(await res.text())

    const stripe = await loadStripe('pk_test_rz8eXQl5uOAVXLJrZM4oAkBb003cqy35qz')
    stripe.redirectToCheckout({
      sessionId: session.id
      // successUrl: 'http://localhost:3000',
      // cancelUrl: 'http://localhost:3000',
      // items: Object.keys(skus).map(sku => ({
      //   sku,
      //   quantity: skus[sku]
      // })),
      // metadata: { address }
    })
  }
</script>

<style>
  dialog {
    pointer-events: none;
    position: fixed;
    top: 0;
    z-index: 30;
    height: 100vh;
    overflow-y: auto;
    padding: 1vw;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    text-align: center;
  }

  dialog > div {
    pointer-events: auto;
    position: relative;
    padding: var(--gutter);
    background: white;
    border: 1px solid var(--grey);
    border-radius: 6px;
    max-height: 100vh;
    max-width: 42ch;
    overflow-y: auto;
  }

    button.back {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 29;
      width: 100vw;
      height: 100vh;
      background: hsla(0, 0%, 100%, 0.88);
    }

    button.close {
      position: absolute;
      top: 0;
      right: 0;
      padding: calc(var(--gutter) / 4);
    }

    button.checkout {
      font-size: var(--medium);
      padding: calc(var(--rythm) / 2) calc(var(--rythm) * 2);
      color: white;
      background: var(--black);
    }

    button.underline {
      color: var(--taupe);
      text-decoration: underline;
    }

  ol {
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0 calc(-0.5 * var(--gutter)) var(--rythm);
  }

    li {
      display: flex;
      align-items: center;
    }

      li > figure {
        width: 9ch;
        padding-right: var(--rythm);
        margin: 0;
      }

      li > summary {
        width: 16ch;
      }

      li > h2,
      li > summary > h3 {
        margin-bottom: 0;
      }

      li > h2 {
        padding-right: var(--rythm);
      }

      img {
        width: 100%;
      }

  label {
    display: block;
    text-align: left;
  }
</style>

{#if $visible}
<button class="transparent back" transition:fade={{ opacity: 0.5 }} on:click={hide} />
<dialog open transition:fade>
  {#if !shipping}
  <div>
    <button class="transparent underline close" on:click={hide}>Close ✕</button>
    <h2>Your Cart</h2>

    {#if $items.length}
    <ol>
    {#each $items as item, index}
      <li>
        <figure>
          <picture>
            <img src={item.thumbnail} alt={item.title} />
          </picture>
        </figure>
        <summary>
          <h3>{item.title}</h3>
          <small>{item.color}, Size {item.size}</small>
        </summary>
        <h2>{item.price} CAD</h2>
        <button class="transparent" on:click={() => removeFromCart(index)}>✕</button>
      </li>
    {/each}
    </ol>

    <button class="checkout" on:click={() => shipping = true}>Continue to Shipping</button>
    <br />
    {:else}
    <h4>Your cart is currently empty.</h4>
    {/if}
    
    <button class="transparent underline" on:click={hide}>Keep Shopping</button>
  </div>
  {:else}
  <div>
    <button class="transparent underline close" on:click={() => shipping = false}>Back to Cart</button>
    <h2>Shipping Address</h2>

    <form on:submit|preventDefault={e => {
      checkout(e.target['email'].value, {
        name: e.target['name'].value,
        street1: e.target['street1'].value,
        street2: e.target['street2'].value,
        city: e.target['city'].value,
        state: e.target['state'].value,
        country: e.target['country'].value,
        zip: e.target['zip'].value,
      })
    }}>
      <label for="email">Email Address</label>
      <input type="email" name="email" id="email">

      <label for="name">Full Name</label>
      <input type="text" name="name" id="name">

      <label for="street1">Street Address</label>
      <input type="text" name="street1" id="street1">

      <label for="street2">Apt/Unit/Suite</label>
      <input type="text" name="street2" id="street2">

      <label for="city">City</label>
      <input type="text" name="city" id="city">

      <label for="state">Province</label>
      <input type="text" name="state" id="state">

      <label for="country">Country</label>
      <input type="text" name="country" id="country" value="Canada" readonly>

      <label for="zip">Postal Code</label>
      <input type="zip" name="zip" id="zip">

      <button class="checkout" type="submit">Proceed to Checkout</button>
    </form>
  </div>
  {/if}
</dialog>
{/if}
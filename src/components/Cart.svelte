<script context="module">
  import { fade } from 'svelte/transition'
  import { writable } from 'svelte/store'

  export const visible = writable(false)
  export const items = writable([])

  export const addToCart = (title, size, color, price, thumbnail) => {
    items.update(list => {
      list.push({ title, size, color, price, thumbnail })
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
  let donating = false
  let waiting = false

  let donation
  let frequency = 'once'
  let note

  const hide = () => {
    visible.set(false)
    shipping = false
  }

  const checkout = async (email, address) => {
    waiting = true

    const res = await fetch(`/checkout.json`, {
      method:'POST',
      body: JSON.stringify({
        items: [
          ...$items.map(item => ({
            ...item,
            name: `${item.title} – ${item.size} – ${item.color}`
          })),
          ...(donating && frequency === 'once') ? [{
            name: 'Donation',
            price: donation,
            quantity: 1
          }] : []
        ],
        // ...(donating && frequency === 'monthly') && { subscription: `monthly_${donation}` },
        email,
        address,
        note
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).catch(error => {
      console.error(error)
      waiting = false
    })
		const { session } = JSON.parse(await res.text())

    const stripe = await loadStripe('pk_test_rz8eXQl5uOAVXLJrZM4oAkBb003cqy35qz')
    stripe.redirectToCheckout({
      sessionId: session.id
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
    max-width: 100vw;
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

  @media all and (max-width:666px) {
    dialog > div {
      padding: calc(var(--gutter) * 3) calc(var(--gutter));
      width: 100vw;
    }
  }

    button.back {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 29;
      width: 100vw;
      height: 100vh;
      background: hsla(0, 0%, 100%, 0.88);
      backdrop-filter: blur(20px);
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

    button.checkout[disabled] {
      color: hsla(0, 0%, 100%, 0.66);
    }

    button.underline {
      color: var(--taupe);
      text-decoration: underline;
    }

  ol {
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0 0 var(--rythm);
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

      li > summary > small {
        display: block;
      }

      li > h2 {
        padding-right: var(--rythm);
      }

      img {
        width: 100%;
      }

  aside {
    font-size: var(--body);
    margin-bottom: var(--rythm);
  }

    aside > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    aside > div:first-of-type  {
      margin-top: calc(var(--rythm)); 
    }

    aside > div:last-of-type  {
      margin-bottom: calc(var(--rythm) * 2); 
    }

    aside > div > div label {
      padding: 0 calc(var(--rythm) / 2);
      font-size: var(--medium);
    }

  form {
    margin: 0 calc(-0.5 * var(--gutter));
  }

  label {
    display: block;
    text-align: left;
    font-size: var(--body);
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
    <form on:submit|preventDefault={e => {
      if (donating) {
        donation = e.target['donation'].value
        // frequency = e.target['frequency'].value
      }

      note = e.target['note'].value
      shipping = true
    }}>
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

      <aside>
        {#if donating}
        <button type="button" on:click={() => donating = false}>Sorry, Nevermind</button>

        <div>
          <div><label>Donate</label></div>
          {#each [5, 10, 20] as amount, index}
          <div>
            <input type="radio" name="donation" value={amount} id={amount}
              checked={index === 0}>
            <label for={amount}>{amount} CAD</label>
          </div>
          {/each}
        </div>
        <!-- <div>
          {#each Object.entries({ monthly: 'On a monthly basis', once: 'Only once now' }) as [frequency, label], index}
          <div>
            <input type="radio" name="frequency" value={frequency} id={frequency}
              checked={index === 0}>
            <label for={frequency}>{label}</label>
          </div>
          {/each}
        </div> -->
        {:else}
        Looking to help a bit more? <button type="button" on:click={() => donating = true}>Consider Donating</button>
        {/if}
      </aside>

      <label for="note">Leave Victoria a note:</label>
      <input type="text" name="note" id="note">

      <button class="checkout" type="submit">Continue to Shipping</button>
    </form>
    {:else}
    <h4>Your cart is currently empty.</h4>
    {/if}
    
    <button class="transparent underline" on:click={hide}>Keep Shopping</button>
  </div>
  {:else}
  <div>
    <button class="transparent underline close" on:click={() => shipping = false}>Back to Cart</button>
    <h2>Shipping Address</h2>
    <p>Shipping is free!</p>

    <form on:submit|preventDefault={e => {
      if (!waiting) {
        checkout(e.target['email'].value, {
          name: e.target['name'].value,
          street1: e.target['street1'].value,
          street2: e.target['street2'].value,
          city: e.target['city'].value,
          state: e.target['state'].value,
          country: e.target['country'].value,
          zip: e.target['zip'].value,
        })
      }
    }}>
      <label for="email">Email Address</label>
      <input type="email" name="email" id="email" required>

      <label for="name">Full Name</label>
      <input type="text" name="name" id="name" required>

      <label for="street1">Street Address</label>
      <input type="text" name="street1" id="street1" required>

      <label for="street2">Apt/Unit/Suite</label>
      <input type="text" name="street2" id="street2">

      <label for="city">City</label>
      <input type="text" name="city" id="city" required>

      <label for="state">Province</label>
      <input type="text" name="state" id="state" required>

      <label for="country">Country</label>
      <input type="text" name="country" id="country" value="Canada" readonly>

      <label for="zip">Postal Code</label>
      <input type="zip" name="zip" id="zip" required>

      <button class="checkout" type="submit" disabled={waiting}>{#if waiting}One moment...{:else}Proceed to Checkout{/if}</button>
    </form>
  </div>
  {/if}
</dialog>
{/if}
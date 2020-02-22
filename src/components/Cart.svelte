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

  const checkout = async () => {
    const skus = $items.reduce((_, { sku }) => {
      return _[sku]
        ? { ..._, [sku]: _[sku] + 1 }
        : { ..._, [sku]: 1 }
    }, {})
    
    const stripe = await loadStripe('pk_test_rz8eXQl5uOAVXLJrZM4oAkBb003cqy35qz')
    stripe.redirectToCheckout({
      successUrl: 'http://localhost:3000',
      cancelUrl: 'http://localhost:3000',
      items: Object.keys(skus).map(sku => ({
        sku,
        quantity: skus[sku]
      }))
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
        width: 10vw;
        padding-right: var(--rythm);
        margin: 0;
      }

      li > summary {
        width: 24ch;
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
</style>

{#if $visible}
<button class="transparent back" transition:fade={{ opacity: 0.5 }} on:click={() => visible.set(false)} />
<dialog open transition:fade>
  <div>
    <button class="transparent underline close" on:click={() => visible.set(false)}>Close ✕</button>
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

    <button class="checkout" on:click={checkout}>Proceed to Checkout</button>
    <br />
    {:else}
    <h4>Your cart is currently empty.</h4>
    {/if}
    
    <button class="transparent underline" on:click={() => visible.set(false)}>Keep Shopping</button>
  </div>
</dialog>
{/if}
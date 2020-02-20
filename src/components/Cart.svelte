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
      background: hsla(0, 0%, 100%, 0.94);
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
<button class="transparent back" transition:fade on:click={() => visible.set(false)} />
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

    <a href="/checkout?items={encodeURIComponent(json.encode($items))}" on:click={() => visible.set(false)}>
      <button class="checkout">Proceed to Checkout</button>
    </a><br />
    {:else}
    <h4>Your cart is currently empty.</h4>
    {/if}
    
    <button class="transparent underline" on:click={() => visible.set(false)}>Keep Shopping</button>
  </div>
</dialog>
{/if}
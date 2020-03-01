<script context="module">
  import json from 'json-complete'

  export async function preload({ params }) {
    const res = await this.fetch(`checkout/${params.identifier}.json`)
		const { checkout } = json.decode(await res.text())

		if (res.status === 200) {
			return { checkout }
		} else {
			this.error(res.status)
		}
  }
</script>

<script>
  import { onMount } from 'svelte'
  import { items } from '../../components/Cart.svelte'

  export let checkout

  onMount(()=> {
    items.set([])
    sessionStorage.clear('items')
  })
</script>

<style>
  center {
  }

  figure {
    width: 9ch;
    padding-right: var(--rythm);
    margin: 0;
  }

  img {
    width: 100%;
  }

  table {
    margin: calc(var(--rythm) * 3) 0;
    border-collapse: collapse;
    max-width: 42ch;
  }
  
  tr {
    border-top: 2px solid var(--grey);
  }

  th, td {
    padding: calc(var(--rythm) / 2);
  }

  th {
    text-align: left;
  }
</style>

<center>
  <h1>Success!</h1>
  <p>Thank you for your support! I’ll get straight to work!</p>

  <table>
    <tbody>
      <tr>
        <th>Payment ID</th>
        <td colspan="2">{checkout.id}</td>
      </tr>
      <tr>
        <th>Email Address</th>
        <td colspan="2">{checkout.email}</td>
      </tr>
      {#each checkout.items as item}
      <tr>
        <td>
          {#if item.thumbnail}<figure>
            <picture>
              <img src={item.thumbnail} alt={item.title} />
            </picture>
          </figure>{/if}
        </td>
        <th>{item.quantity} {item.title}</th>
        <td>{item.total} CAD</td>
      </tr>
      {/each}
      <tr>
        <th>Order Total</th>
        <td></td>
        <td>{checkout.total} CAD</td>
      </tr>
      {#if checkout.shipping}<tr>
        <th>Shipping Address</th>
        <td colspan="2">{Object.values(checkout.shipping).join(` `)}</td>
      </tr>{/if}
      {#if checkout.note}<tr>
        <th>Note for Victoria</th>
        <td colspan="2">{checkout.note}</td>
      </tr>{/if}
    </tbody>
  </table>
</center>

<script>
  import { loadStripe } from '@stripe/stripe-js'

  let donating = false
  let waiting = false

  // let frequency = 'once'

  const checkout = async (email, donation) => {
    waiting = true

    const res = await fetch(`/checkout.json`, {
      method:'POST',
      body: JSON.stringify({
        email,
        items: [
          {
            name: 'Donation',
            price: donation,
            quantity: 1
          }
        ],
        // ...(donating && frequency === 'monthly') && { subscription: `monthly_${donation}` }
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

    const stripe = await loadStripe('pk_live_7WnlDY2Ak8qSSxZFtk52vF5O00GOfQC939')
    stripe.redirectToCheckout({
      sessionId: session.id
    })
  }
</script>

<style>
  aside {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 66ch;
    margin: 0 auto;
    padding: calc(var(--rythm) * 2) calc(var(--rythm) * 2) calc(var(--rythm) * 4);
  }

  button {
    font-size: var(--medium);
    padding: calc(var(--rythm) / 2) calc(var(--rythm) * 2);
  }

  button.checkout {
    color: white;
    background: var(--black);
  }

  button[disabled] {
    color: hsla(0, 0%, 100%, 0.66);
  }

  form > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  form > div:first-of-type  {
    margin-top: calc(var(--rythm)); 
  }

  form > div:last-of-type  {
    margin-bottom: calc(var(--rythm) * 2); 
  }

  form > div > div label {
    padding: 0 calc(var(--rythm) / 2);
    font-size: var(--medium);
  }
</style>

<aside>
  {#if donating}
  <!-- <button type="button" on:click={() => donating = false}>Sorry, Nevermind</button> -->

  <form on:submit|preventDefault={e => {
    checkout(e.target['email'].value, e.target['donation'].value)
  }}>
    <h2>Fantastic, thank you!</h2>

    <div>
      <div><label>Donate</label></div>
      {#each [10, 20, 30, 40] as amount, index}
      <div>
        <input type="radio" name="donation" value={amount} id={amount}
          checked={index === 0}>
        <label for={amount}>{amount} CAD</label>
      </div>
      {/each}
    </div>

    <label for="email">Your Receipt Email Address</label>
    <input type="email" name="email" id="email" required>

    <!-- <div>
      {#each Object.entries({ monthly: 'On a monthly basis', once: 'Only once now' }) as [frequency, label], index}
      <div>
        <input type="radio" name="frequency" value={frequency} id={frequency}
          checked={index === 0}>
        <label for={frequency}>{label}</label>
      </div>
      {/each}
    </div> -->

    <button class="checkout" type="submit" disabled={waiting}>{#if waiting}One moment...{:else}Proceed to Donation{/if}</button>
  </form>
  {:else}
  <h2>Not looking to buy but still want to help?</h2>
  <button type="button" on:click={() => donating = true}>Consider Donating</button>
  {/if}
</aside>
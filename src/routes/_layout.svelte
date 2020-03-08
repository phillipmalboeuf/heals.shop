<script>
  import { fade } from 'svelte/transition'
  import Header from '../components/Header.svelte'
  import Footer from '../components/Footer.svelte'
  import Cart from '../components/Cart.svelte'
  import Analytics from '../components/Analytics.svelte'

  import { stores } from '@sapper/app'
	const { preloading } = stores()

	export let segment
</script>

<style>
	:global(*) {
    box-sizing: border-box;
  }

	:global(:root) {
    --rythm: 16px;
		--gutter: 3vw;

		--huge: 5vw;
		--big: 32px;
    --medium: 22px;
    --small: 15px;
    --body: 16px;

		--black: #1D2135;
		--navy: #3F5277;
		--grey: #EDEDED;
    --light: #F5F5F5;
    --taupe: #C0B2BE;

    --serif: 'Untitled Serif', 'Untitled Serif Test', 'Times New Roman', Times, serif;
    --sans: 'Inter', system-ui, -apple-system;
  }

  @media all and (max-width:666px) {
    :global(:root) {
      --rythm: 14px;
		  --gutter: 4vw;

      --huge: 66px;
      --big: 28px;
      --medium: 20px;
    }
  }

	:global(html) {
    background-color: var(--navy);
    position: relative;
  }

	:global(body) {
		font-family: "Inter", system-ui, -apple-system;
    font-size: 20px;
    line-height: 1.333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: hsla(0, 0%, 0%, 0.5);

		color: var(--black);
		background: white;
    
		margin: 0 0 50vh;
    overflow-x: hidden;
	}

	main {
    position: relative;
    z-index: 10;
    background: white;
		padding: calc(6.66vw + var(--gutter)) var(--gutter) var(--gutter);
    min-height: 100vh;
	}

  @media all and (max-width:666px) {
    main {
      padding-top: 66px;
    }
  }

	:global(h1, h2, h3, h4, h5, h6, p, figure) {
		font-weight: normal;
    margin: 0 0 var(--rythm);
    /* white-space: pre-line; */
  }

	:global(h1) {
    font-family: var(--serif);
    font-size: var(--huge);
    line-height: 1;
  }

  :global(h2) {
    font-size: var(--big);
  }

  :global(h3) {
    font-size: var(--big);
    font-family: var(--serif);
  }

  :global(h4) {
    font-size: var(--medium);
    font-family: var(--serif);
  }

  :global(h6),
  :global(small) {
    font-size: var(--small);
    line-height: 1;
  }

  :global(p) {
    font-size: var(--body);
  }

	:global(p:last-child) {
    margin-bottom: 0;
  }

	:global(p + h1, p + h2, p + h4,
		ul + h1, ul + h2, ul + h4,
		ol + h1, ol + h2, ol + h4) {
    margin-top: calc(var(--rythm)*2);
  }

  :global(h1 + h2, h2 + h4, h3 + h6, h4 + h6) {
    margin-top: calc(var(--rythm) / -1.25);
  }

  :global(ul, ol) {
    margin: 0 0 calc(var(--rythm) * 1.5);
    padding-left: var(--rythm);
  }

  :global(a, button, input) {
    outline: none;
    cursor: pointer;
    color: inherit;
    font-size: var(--body);
    text-decoration: none;
    position: relative;
    border: none;
    background: transparent;
    transition: font-variation-settings 333ms;
  }

  :global(button) {
    border: 2px solid var(--grey);
    border-radius: 6px;
  }

  :global(label) {
    /* font-size: var(--body);
    color: var(--navy); */
  }

  :global(input) {
    font-size: var(--medium);
    width: 100%;
    padding: 0.333em;
    border-bottom: 2px solid var(--taupe);
    background: var(--light);
    margin-bottom: var(--rythm);
  }

  :global(input:last-of-type) {
    margin-bottom: calc(var(--rythm) * 2);
  }

  :global(a:active, button:active, input:active) {
    top: 1px;
  }

  :global(button[disabled]) {
		pointer-events: none;
	}

  :global(button.transparent) {
    padding: 0;
    border: none;
    border-radius: none;
    background: transparent;
  }

  :global(input[type="radio"]) {
		appearance: none;
		-webkit-appearance: none;
		display: block;
		width: calc(var(--rythm) * 3);
		height: calc(var(--rythm) * 3);
		border-radius: 50%;
		margin: 0 auto;
		background-size: cover;
		background-position: center;
	}

	:global(input[type="radio"] + label) {
		cursor: pointer;
	}

	:global(input[type="radio"]:not([style])) {
		display: none;
	}

	:global(input[type="radio"]:checked) {
		border-color: var(--black);
	}

	:global(input[type="radio"]:checked + label) {
		text-decoration: underline;
	}

  figure {
    position: fixed;
    z-index: 666;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    margin: 0;
    background: white;
  }
</style>

<Header {segment} />

<main>
	<slot></slot>
</main>

<Footer {segment} />

<Cart />
<Analytics />

{#if $preloading}
<figure transition:fade />
{/if}


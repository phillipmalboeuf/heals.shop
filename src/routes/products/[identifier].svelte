<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`products/${params.identifier}.json?collection=${query.collection}`)
		const { product, collection } = json.decode(await res.text())

		if (res.status === 200) {
			return { product, collection }
		} else {
			this.error(res.status)
		}
	}
</script>

<script>
	import Picture from '../../components/Picture.svelte'
	import Document from '../../components/document/index.svelte'

	export let product
	export let collection

	function addToCart(event) {
		console.log(event.currentTarget.color.value)
	}
</script>

<style>
	section {
		display: flex;
	}

	figure {
		width: 42vw;
	}

		figure :global(img) {
			margin-bottom: var(--rythm);
		}

	article {
		width: 58vw;
		padding: calc(var(--gutter) / 2);
	}

	article :global(p) {
		max-width: calc(var(--rythm) * 33);
	}

	button {
		font-size: var(--medium);
		padding: calc(var(--rythm) / 2) calc(var(--rythm) * 2);
		color: white;
		background: var(--black);
	}

	button[disabled] {
		pointer-events: none;
		background: var(--navy);
		opacity: 0.33;
	}

	section > div {
		margin: 0 0.5vw var(--rythm);
	}

	input[type="radio"] {
		appearance: none;
		-webkit-appearance: none;
		display: block;
		width: calc(var(--rythm) * 3);
		height: calc(var(--rythm) * 3);
		border-radius: 50%;
		margin: 0 auto;
	}

	input[type="radio"]:checked {
		border-color: var(--black);
	}

	input[type="radio"]:checked + label {
		text-decoration: underline;
	}
</style>

<svelte:head>
	<title>{product.fields.title}</title>
</svelte:head>

<section>
	<figure>
		{#each product.fields.photos as photo}
		<Picture media={photo} />
		{/each}
	</figure>

	<article>
		<a rel=prefetch href="collections/{collection.fields.identifier}">{collection.fields.title}</a>
		<h1>{product.fields.title}</h1>
		<h2>{#if product.fields.comingSoon}–– CAD{:else}{product.fields.price} CAD{/if}</h2>

		<Document body={product.fields.description} />

		<form on:submit|preventDefault={addToCart}>
			{#if product.fields.colors}
			<section>
			{#each Object.keys(product.fields.colors) as color, index}
			<div>
				<input type="radio" name="color" value={color} id={color} style="background:{product.fields.colors[color]}"
					checked={index === 0}>
				<label for={color}>{color}</label>
			</div>
			{/each}
			</section>
			{/if}

			{#if product.fields.comingSoon}<button type="submit" disabled>Coming Soon</button>{:else}<button type="submit">Add to Cart</button>{/if}
		</form>
	</article>
</section>
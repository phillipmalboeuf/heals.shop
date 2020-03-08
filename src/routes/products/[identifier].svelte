<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`products/${params.identifier}.json?collection=${query.collection}`)
		const { product, collection, materials } = json.decode(await res.text())

		if (res.status === 200) {
			return { product, collection, materials: materials.items.reduce((_, material) => {
				return {
					..._,
					[material.fields.name]: material
				}
			}, {}) }
		} else {
			this.error(res.status)
		}
	}
</script>

<script>
	import Picture from '../../components/Picture.svelte'
	import Document from '../../components/document/index.svelte'

	import { visible, addToCart } from '../../components/Cart.svelte'

	export let product
	export let collection
	export let materials

	let photoIndex = 0
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

		figure button {
			width: 33%;
		}


	article {
		width: 58vw;
		padding: calc(var(--gutter) / 2);
	}

	@media all and (max-width:666px) {
		section {
			flex-wrap: wrap;
		}
		
		figure,
		article {
			width: 100%;
		}

		article {
			margin-bottom: calc(var(--gutter) * 2);
		}
	}

	article :global(p) {
		max-width: calc(var(--rythm) * 33);
	}

	form {
		margin-top: calc(var(--rythm) * 2);
	}

	button[type="submit"] {
		font-size: var(--medium);
		padding: calc(var(--rythm) / 2) calc(var(--rythm) * 2);
		color: white;
		background: var(--black);
	}
	
	section > div {
		margin: 0 0.5vw var(--rythm);
	}

	@media all and (max-width:666px) {
		button[type="submit"] {
			width: 100%;
		}

		section > div {
			margin: 0 1.5vw var(--rythm);
		}
	}
</style>

<svelte:head>
	<title>{product.fields.title}</title>
</svelte:head>

<section>
	<figure>
		<Picture media={product.fields.photos[photoIndex]} />

		{#each product.fields.photos as photo, index}
		{#if index !== photoIndex}
		<button class="transparent" on:click={() => { photoIndex = index }}><Picture media={photo} /></button>
		{/if}
		{/each}
	</figure>

	<article>
		{#if collection}
		<a rel=prefetch href="collections/{collection.fields.identifier}">{collection.fields.title}</a>
		{/if}
		
		<h1>{product.fields.title}</h1>
		<h2>{#if product.fields.comingSoon}–– CAD{:else}{product.fields.price} CAD{/if}</h2>

		<Document body={product.fields.description} />

		<form on:submit|preventDefault={e => {
			addToCart(product.fields.title, e.target.size.value, e.target.color.value, product.fields.price, `${product.fields.photos[0].fields.file.url}?w=600`)
			visible.set(true)
		}}>

			<section>
				<div>Size:</div>
				{#each [6, 7, 7.5, 8, 8.5, 9] as size, index}
				<div>
					<input type="radio" name="size" value={size} id={size}
						checked={index === 0}>
					<label for={size}>{size}</label>
				</div>
				{/each}
			</section>

			{#if product.fields.materials}
			<section>
				{#each product.fields.materials as material, index}
				<div>
					<input type="radio" name="color" value={material} id={material} style="background-color: {materials[material].fields.color}"
						checked={index === 0}>
					<label for={material}>{material}</label>
				</div>
				{/each}
			</section>
			{/if}

			{#if product.fields.comingSoon}<button type="submit" disabled>Coming Soon</button>{:else}<button type="submit">Add to Cart</button>{/if}
		</form>
	</article>
</section>
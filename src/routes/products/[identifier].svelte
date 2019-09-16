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
		padding: calc(var(--gutter) / 2);
	}

	article :global(p) {
		max-width: calc(var(--rythm) * 33);
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

		<Document body={product.fields.description} />
	</article>
</section>
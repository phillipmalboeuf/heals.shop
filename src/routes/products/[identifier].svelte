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
	export let product
	export let collection
</script>

<style>
</style>

<svelte:head>
	<title>{product.fields.title}</title>
</svelte:head>

<a rel=prefetch href="collections/{collection.fields.identifier}">{collection.fields.title}</a>
<h1>{product.fields.title}</h1>
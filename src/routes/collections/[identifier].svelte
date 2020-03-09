<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`collections/${params.identifier}.json`)
		const { collection, materials } = json.decode(await res.text())

		if (res.status === 200) {
			return { collection, materials: materials.items.reduce((_, material) => {
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
  import Collection from '../../components/Collection.svelte'
	import Document from '../../components/document/index.svelte'

	export let collection
	export let materials
</script>

<style>
	h1 {
		/* margin-top: var(--gutter); */
	}
</style>

<svelte:head>
	<title>{collection.fields.title}</title>
</svelte:head>

<h1>{collection.fields.title}</h1>
<summary><Document body={collection.fields.description} /></summary>

<Collection {collection} {materials} />
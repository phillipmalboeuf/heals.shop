<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch('home.json')
		const { collection, column, materials } = json.decode(await res.text())

		return { collection, column, materials: materials.items.reduce((_, material) => {
			return {
				..._,
				[material.fields.name]: material
			}
		}, {}) }
	}
</script>

<script>
	import { stores } from '@sapper/app'
	const { page, session } = stores()

	import Collection from '../components/Collection.svelte'
	import Column from '../components/Column.svelte'
	import Hero from '../components/Hero.svelte'
	import Document from '../components/document/index.svelte'

	export let collection
	export let column
	export let materials
</script>

<svelte:head>
	<title>{collection.fields.title}</title>
</svelte:head>

<Hero title={collection.fields.title} summary={collection.fields.description} photo={collection.fields.heroPhoto} />

<Collection {collection} {materials} />
<Column {column} />
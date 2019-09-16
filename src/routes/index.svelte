<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch('home.json')
		const { collection, column } = json.decode(await res.text())

		return { collection, column }
	}
</script>

<script>
	import { stores } from '@sapper/app'
	const { page, session } = stores()

	import Collection from '../components/Collection.svelte'
	import Column from '../components/Column.svelte'
	import Document from '../components/document/index.svelte'

	export let collection
	export let column
</script>

<style>
	h1, summary {
		text-align: center;
	}
</style>

<svelte:head>
	<title>{collection.fields.title}</title>
</svelte:head>

<h1>{collection.fields.title}</h1>
<summary><Document body={collection.fields.description} /></summary>

<Collection {collection} />
<Column {column} />
<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`pages/${params.identifier}.json`)
		const { page } = json.decode(await res.text())

		if (res.status === 200) {
			return { page }
		} else {
			this.error(res.status)
		}
	}
</script>

<script>
	import Document from '../../components/document/index.svelte'
	export let page
</script>

<style>
	article {
		max-width: 42ch;
		margin: 0 auto;
	}
</style>

<svelte:head>
	<title>{page.fields.title}</title>
</svelte:head>

<article>
	<h2>{page.fields.title}</h2>
	<Document body={page.fields.body} />
</article>

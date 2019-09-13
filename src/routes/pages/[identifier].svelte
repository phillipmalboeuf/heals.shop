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
	export let page
</script>

<style>
</style>

<svelte:head>
	<title>{page.fields.title}</title>
</svelte:head>

<h1>{page.fields.title}</h1>
<h2>Something</h2>

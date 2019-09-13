<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`workshops/${params.identifier}.json`)
		const { workshop } = json.decode(await res.text())

		if (res.status === 200) {
			return { workshop }
		} else {
			this.error(res.status)
		}
	}
</script>

<script>
	export let workshop
</script>

<style>
</style>

<svelte:head>
	<title>{workshop.fields.title}</title>
</svelte:head>

<a rel=prefetch href="workshops">Back to Workshops</a>
<h1>{workshop.fields.title}</h1>
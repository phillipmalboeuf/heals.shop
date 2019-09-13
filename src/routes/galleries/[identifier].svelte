<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`galleries/${params.identifier}.json`)
		const { gallery } = json.decode(await res.text())

		if (res.status === 200) {
			return { gallery }
		} else {
			this.error(res.status)
		}
	}
</script>

<script>
	export let gallery
</script>

<style>
	h1, h2 {
		text-align: center;
	}
</style>

<svelte:head>
	<title>{gallery.fields.title}</title>
</svelte:head>

<h1>{gallery.fields.title}</h1>
<h2>Something</h2>

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
	import Document from '../../components/document/index.svelte'
	import Picture from '../../components/Picture.svelte'

	export let gallery
</script>

<style>
	h1, summary {
		text-align: center;
	}

	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

		section :global(picture) {
			display: inline-block;
			width: 33%;
			padding: var(--rythm);
		}

		@media all and (max-width:666px) {
			section :global(picture) {
				width: 100%;
			}
		}
</style>

<svelte:head>
	<title>{gallery.fields.title}</title>
</svelte:head>

<h1>{gallery.fields.title}</h1>
<summary><Document body={gallery.fields.description} /></summary>

<section>
	{#each gallery.fields.photos as photo}
	<Picture media={photo} />
	{/each}
</section>
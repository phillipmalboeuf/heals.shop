<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch('workshops.json')
		const { workshops } = json.decode(await res.text())

		return { workshops }
	}
</script>

<script>
	export let workshops
</script>

<style>
</style>

<h1>Workshops</h1>
<ol>
  {#each workshops.items as workshop}
  <li>
    <a rel=prefetch href="workshops/{workshop.fields.identifier}">{workshop.fields.title}</a>
  </li>
  {/each}
</ol>
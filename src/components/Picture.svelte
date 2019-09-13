<script>
  export let media
  export let small = false
</script>

<style>
  img {
    width: 100%;
  }
</style>

<picture>
  {#if small}
  <source srcSet="{media.fields.file.url}?w=400" media="(max-width: 900px)" />
  <source srcSet="{media.fields.file.url}?w=600" media="(max-width: 1200px)" />
  <img src="{media.fields.file.url}?w=800" alt="{media.fields.title} {media.fields.description}" />
  {:else}
  <source srcSet="{media.fields.file.url}?w=900" media="(max-width: 900px)" />
  <source srcSet="{media.fields.file.url}?w=1200" media="(max-width: 1200px)" />
  <img src="{media.fields.file.url}?w=1800" alt="{media.fields.title} {media.fields.description}" />
  {/if}
</picture>
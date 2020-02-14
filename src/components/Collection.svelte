<script>
  import Picture from './Picture.svelte'
  export let collection
</script>

<style>
  ol {
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: calc((var(--gutter) / -4) + var(--rythm) * 4) calc(var(--gutter) / -4);
  }

    li {
      width: 33.3%;
      padding: calc(var(--gutter) / 4);
      /* text-align: center; */
    }
</style>

<ol>
  {#each collection.fields.products as product}
  <li>
    <a rel=prefetch href="products/{product.fields.identifier}?collection={collection.fields.identifier}">
      <figure><Picture media={product.fields.photos[0]} /></figure>
      <h4>{product.fields.title}</h4>
      <h6>{#if product.fields.comingSoon}Coming Soon{:else}{product.fields.price} CAD{/if}</h6>
    </a>
  </li>
  {/each}
</ol>
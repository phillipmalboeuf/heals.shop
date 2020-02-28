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

    @media all and (max-width:666px) {
      li {
        width: 100%;
      }
    }

  figure {
    position: relative;
  }

    figure > :global(picture + picture) {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 333ms;
    }

    a:hover figure > :global(picture + picture) {
      opacity: 1;
    }
</style>

<ol>
  {#each collection.fields.products as product}
  <li>
    <a rel=prefetch href="products/{product.fields.identifier}?collection={collection.fields.identifier}">
      {#if product.fields.photos.length > 1}
      <figure>
        <Picture media={product.fields.photos[0]} />
        <Picture media={product.fields.photos[1]} />
      </figure>
      {:else}
      <figure><Picture media={product.fields.photos[0]} /></figure>
      {/if}
      <h3>{product.fields.title}</h3>
      <h6>{#if product.fields.comingSoon}Coming Soon{:else}{product.fields.price} CAD{/if}</h6>
    </a>
  </li>
  {/each}
</ol>
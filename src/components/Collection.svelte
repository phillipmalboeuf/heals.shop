<script>
  import Picture from './Picture.svelte'
  export let collection
  export let materials
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

    figcaption {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

      figcaption span {
        display: inline-block;
        width: calc(var(--rythm) * 1.42);
        height: calc(var(--rythm) * 1.42);
        border-radius: 50%;
        margin: 0 calc(var(--rythm) / 4);
        background-size: cover;
        background-position: center;
      }
</style>

<ol>
  {#each collection.fields.products as product}
  <li>
    <a rel=prefetch href="products/{product.fields.identifier}?collection={collection.fields.identifier}">
      <figure>
        {#if product.fields.photos.length > 1}
        <Picture media={product.fields.photos[0]} />
        <Picture media={product.fields.photos[1]} />  
        {:else}
        <Picture media={product.fields.photos[0]} />
        {/if}

        <figcaption>
          <div>
            <h3>{product.fields.title}</h3>
            <h6>{#if product.fields.comingSoon}Coming Soon{:else}{product.fields.price} CAD{/if}</h6>
          </div>
          <div>
            {#each product.fields.materials as material, index}
            <span style="background-color: {materials[material].fields.color}"></span>
            {/each}
          </div>
        </figcaption>
      </figure>
      
    </a>
  </li>
  {/each}
</ol>
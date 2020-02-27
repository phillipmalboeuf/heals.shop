<script>
  export let title
  export let summary
  export let photo

  import Document from './document/index.svelte'
  import Picture from './Picture.svelte'
</script>

<style>
  figure {
    position: relative;
    min-height: 66vh;
    padding: var(--gutter);
    margin: calc(var(--gutter) * -1) calc(var(--gutter) * -1) 0;
    background: var(--navy);

    display: flex;
    align-items: flex-end;
  }

    figcaption {
      color: white;
      position: relative;
      z-index: 1;
    }

    figure :global(picture) {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    figure :global(picture > img) {
      object-fit: cover;
      object-position: center;
      height: 100%;
    }
</style>

<figure>
  {#if photo}<Picture media={photo} />{/if}

  <figcaption>
    <h1>{title}</h1>
    <summary><Document body={summary} /></summary>
  </figcaption>
</figure>
<script>
  export let title
  export let summary

  import Document from './document/index.svelte'
</script>

<style>
  figure {
    min-height: 66vh;
    padding: var(--gutter);
    margin: calc(var(--gutter) * -1) calc(var(--gutter) * -1) 0;
    background: var(--navy);

    display: flex;
    align-items: flex-end;
  }

    figcaption {
      color: white;
    }
</style>

<figure>

  <figcaption>
    <h1>{title}</h1>
    <summary><Document body={summary} /></summary>
  </figcaption>
</figure>
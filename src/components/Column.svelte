<script>
  import Picture from './Picture.svelte'
  import Document from './document/index.svelte'
  export let column
</script>

<style>
  section {
    display: flex;
    /* align-items: center; */
    margin: calc((var(--gutter) / -4) + var(--rythm) * 4) calc(var(--gutter) / -4);
  }

    figure {
      width: 40%;
      padding: calc(var(--gutter) / 4);
    }

    figure:last-child {
      width: 60%;
    }

    article {
      padding: calc(var(--gutter));
    }

    figure {
      margin: 0;
    }
</style>

<section>
  <figure>
    <Picture media={column.fields.photos[0]} />

    <article class={column.fields.alignment}>
      <h4>{column.fields.title}</h4>
      <Document body={column.fields.body} />
    </article>
  </figure>
  <figure>
    <Picture media={column.fields.photos[1]} />
  </figure>
</section>
<script>
  import Picture from './Picture.svelte'
  export let column
</script>

<style>
  section {
    display: flex;
    align-items: center;
  }

    article, figure {
      width: 50%;
    }

    article {
      padding: var(--gutter);
    }

    figure {
      margin: 0;
    }
</style>

<section>
  <article class={column.fields.alignment}>
    <h4>{column.fields.title}</h4>
    <p>Body</p>
  </article>
  <figure>
    <Picture media={column.fields.photos[0]} />
  </figure>
</section>
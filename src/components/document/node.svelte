<script>
  import Mark from './mark.svelte'

  export let node
</script>

{#if node.nodeType === 'heading-2'}
  <h2>{#each node.content as mark}<Mark mark={mark} />{/each}</h2>
{:else if node.nodeType === 'heading-4'}
  <h4>{#each node.content as mark}<Mark mark={mark} />{/each}</h4>
{:else if node.nodeType === 'heading-6'}
  <h6>{#each node.content as mark}<Mark mark={mark} />{/each}</h6>
{:else if node.nodeType === 'paragraph'}
  <p>{#each node.content as mark}<Mark mark={mark} />{/each}</p>
{:else if node.nodeType === 'hr'}
  <hr />

{:else if node.nodeType === 'unordered-list'}
  <ul>
    {#each node.content as item}<li>{#each item.content as node}<svelte:self node={node} />{/each}</li>{/each}
  </ul>

{:else if node.nodeType === 'blockquote'}
  <blockquote>{#each node.content as code}<svelte:self node={code} />{/each}</blockquote>

<!-- {:else if node.nodeType === 'embedded-entry-block'} -->

{/if}
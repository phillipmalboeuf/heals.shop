<script>
	import { stores } from '@sapper/app'
	const { page, session } = stores()

	export let segment
</script>

<style>
  header {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    padding: calc(var(--gutter) / 3);
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav > div {
    width: 25%;
  }

  nav > div:last-child {
    text-align: right;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

    a, button {
      display: inline-block;
      padding: calc(var(--rythm) / 2);
      font-size: var(--medium);
      color: var(--navy);
    }
</style>

<header>
  <nav>
    <div>
      <a href="./"><img src="{$session.content.logo.fields.file.url}" alt="{$session.content.logo.fields.description}" /></a>
    </div>
    <ul>
      {#each $session.content.headerNavigation.fields.links as link}
      <li>
        <a rel=prefetch href="{link.fields.url}">{link.fields.label}</a>
      </li>
      {/each}
    </ul>
    <div>
      <button>Cart</button>
    </div>
  </nav>
</header>
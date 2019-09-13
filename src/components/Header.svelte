<script>
	import { stores } from '@sapper/app'
	const { page, session } = stores()

	export let segment
</script>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav > a {
    width: 25%;
  }

  nav > a:last-child {
    text-align: right;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

    a {
      display: inline-block;
      padding: calc(var(--rythm) / 2);
    }
</style>

<header>
  <nav>
    <a href="./"><img src="{$session.content.logo.fields.file.url}" alt="{$session.content.logo.fields.description}" /></a>
    <ul>
      {#each $session.content.headerNavigation.fields.links as link}
      <li>
        <a rel=prefetch href="{link.fields.url}">{link.fields.label}</a>
      </li>
      {/each}
    </ul>
    <a href="mailto:hi@heals.shop" target="_blank">Email</a>
  </nav>
</header>
<script>
	import { stores } from '@sapper/app'
	const { page, session } = stores()

	export let segment
</script>

<style>
  footer {
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 50vh;
    color: white;
  }

  nav > div {
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }

    a, button, input {
      display: inline-block;
      padding: calc(var(--rythm) / 2);
      font-size: var(--medium);
    }

  form {
    margin-bottom: calc(var(--rythm) / 2);
  }

  form > label {
    display: inline-block;
    margin-bottom: calc(var(--rythm) / 3);
  }

    input {
      border-bottom: 2px solid white;
      background: var(--grey);
    }
</style>

<footer>
  <nav>
    <div>
      <form action="">
        <label for="">Sign up to get updates:</label><br />
        <input type="email" name="email" placeholder="your.email@gmail.com" />
        <button type="submit">Send</button>
      </form>

      <ul>
        {#each $session.content.footerNavigation.fields.links as link}
        <li>
          <a rel=prefetch href="{link.fields.url}">{link.fields.label}</a>
        </li>
        {/each}
      </ul>

      <small>&copy; Heals Shop 2019</small>
    </div>
  </nav>
</footer>
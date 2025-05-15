<script>
import SecretTextarea from '$lib/components/SecretTextarea.svelte';
  import DigestDisplay from '$lib/components/DigestDisplay.svelte';
  import { getDigest, validateDigest } from '$lib/digest';
  
  /** @type {{
   *   data: {
   *     message?: string,
   *     digest: string,
   *     revealed_at?: Date | null
   *   }
   * }}*/
  let { data } = $props();
  let message = data.message;
  let digest = data.digest;
  let revealed_at = data.revealed_at;

  let inputDigest = $state('');

  /** @type {string | null} */
  let error = $state(null);
  if (message) {
    (async function () {
      const isValid = await validateDigest(message, digest);
      if (!isValid) {
        error = 'Digest does not match the message received from server';
      } else {
        error = null; // Reset error if the digest matches
      }
    })();
  };

</script>

<main>
  <div class="container">
    <h1>Secret Message</h1>

    <DigestDisplay {digest} />

    {#if revealed_at}
      <div class="revealed">
        <span class="label">Message revealed</span>
        <p class="message">{message}</p>
        <p>
          Revealed at
          <time datetime="{revealed_at.toISOString()}">{revealed_at.toLocaleString()}</time>
        </p>
      </div>
    {:else}
      <form method="POST">
        <SecretTextarea
            name="message"
            required
            oninput={async (event) => {
              const inputMessage = event.currentTarget.value;
              inputDigest = await getDigest(inputMessage);
              const isValid = inputDigest === digest;
          
              if (!isValid) {
                error = 'Incorrect secret. Please try again.';
              } else {
                error = null;
              }
            }}
        />

        {#if inputDigest}
          <DigestDisplay digest={inputDigest} label="Your input digest" />
          
          {#if inputDigest === digest}
            <p class="success">✓ Valid secret</p>
          {/if}
        {/if}

        {#if error}
          <p class="error">✗ {error}</p>
        {/if}

        {#if !error && inputDigest === digest}
          <button type="submit">Reveal Secret</button>
        {/if}
      </form>
    {/if}
  </div>
</main>

<style>
  main {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem;
  }

  .container {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    width: 100%;
    max-width: 600px;
  }

  h1 {
    font-size: 1.875rem;
    font-weight: 600;
    margin: 0 0 2rem;
    color: #2d3748;
  }

  .label {
    font-size: 0.875rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    display: block;
  }

  button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background: #1d4ed8;
  }

  .error {
    color: #dc2626;
    font-size: 0.875rem;
    margin: 1rem 0;
  }

  .revealed {
    background: #f0fdf4;
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid #bbf7d0;
  }

  .message {
    margin: 0.5rem 0 0;
    font-size: 1.125rem;
    color: #15803d;
  }
</style>
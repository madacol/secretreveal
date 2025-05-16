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
  {#if !revealed_at}
    <div class="container not-revealed">
      <h1>This message has not been revealed</h1>
    </div>
  {/if}
  <div class="container">
    {#if revealed_at}
      <h1>Message revealed</h1>
      <div class="revealed">
        <p class="message">{message}</p>
        <p>
          Revealed at
          <time datetime="{revealed_at.toISOString()}">{revealed_at.toLocaleString()}</time>
        </p>
      </div>
    {:else}
      <p>To reveal, enter the original message below:</p>
      <form method="POST">
        <SecretTextarea
            name="message"
            placeholder="Enter the message"
            required
            oninput={async (event) => {
              const inputMessage = event.currentTarget.value;
              if (!inputMessage) {
                inputDigest = '';
                error = null;
                return;
              }
              inputDigest = await getDigest(inputMessage);
              const isValid = inputDigest === digest;
          
              if (!isValid) {
                error = 'Incorrect message';
              } else {
                error = null;
              }
            }}
        />
        <div class="error-success">
          <p class:no-width={!error || !inputDigest} class="error">✗ {error}</p>
          <button class:no-width={error || !inputDigest} type="submit">Reveal Secret</button>
        </div>
      </form>
    {/if}
    <details>
      <summary><h3>Technical details</h3></summary>
      <h4>Digests comparison</h4>
      <DigestDisplay {digest} label="Expected" />
      <DigestDisplay digest={inputDigest} label="Message" />
    </details>
  </div>
</main>

<style>
  main {
    min-width: fit-content;
    display: grid;
    place-items: start center;
    padding: 2rem;
    box-sizing: border-box;
    gap: 2rem;
  }

  .container {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    width: 100%;
    box-sizing: border-box;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    & > * {
      margin: 0;
    }
  }

  h1 {
    font-size: 1.875rem;
    font-weight: 600;
    margin: 0 0 2rem;
    color: #2d3748;
  }

  .error-success {
    height: 3rem;
    display: flex;
    align-items: center;
    
    button {
      background: #2563eb;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.1s 0.1s;
      
      &:hover {
        background: #1d4ed8;
      }
    }

    .error {
      color: #dc2626;
      font-size: 0.875rem;
      margin: 1rem 0;
      transition: opacity 0.1s 0.1s;
      opacity: 1;
    }

    .no-width {
      width: 0;
      padding: 0;
      margin: 0;
      border: none;
      background: none;
      opacity: 0;
    }
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

  details {
    margin-top: 2rem;
    background: #f9fafb;
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid #e5e7eb;
    summary {
      font-weight: 600;
      color: #1f2937;
      cursor: pointer;
      h3 {
        margin: 0;
        display: inline;
      }
    }
  }
  .not-revealed {
    display: grid;
    place-items: center;
    h1 {
      margin: 0;
    }
  }
</style>
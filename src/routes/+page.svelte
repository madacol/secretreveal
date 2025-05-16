<script>
  import SecretTextarea from '$lib/components/SecretTextarea.svelte';
  import { getDigest } from '$lib/digest';
  import { fly } from 'svelte/transition';
  
  let secret = $state('');
  let shareableLink = $state('');
</script>

<main>
  <div class="container">
    <h1><span>Share now</span><span>Reveal later</span></h1>
    <p class="subtitle">Write the message you'll want to reveal</p>
    
    <SecretTextarea
      autofocus
      placeholder="e.g. I predict that ________ will happen on ______"
      required
      oninput={
        async function(event) {
          secret = event.currentTarget.value;
          
          if (secret) {
            const digest = await getDigest(secret);
            shareableLink = `${window.location.origin}/secret/${digest}`;
          } else {
            shareableLink = '';
          }
        }}
    />

    {#if shareableLink}
      <div class="result" in:fly={{ y: 20, duration: 300 }}>
        <p class="result-title">Share link</p>
        <div class="link-container">
          <input readonly value={shareableLink} />
          <button class="copy-btn" onclick={() => navigator.clipboard.writeText(shareableLink)}>
            Copy
          </button>
          <a href={shareableLink} target="_blank" rel="noopener" class="open-btn">View</a>
        </div>
        <p>To reveal the message, open the link, and write the same exact message.</p>
        <p>If both messages do not match, the message will not be revealed</p>
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    min-width: fit-content;
    box-sizing: border-box;
    display: grid;
    place-items: start center;
    padding: 2rem;
  }

  .container {
    background: white;
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
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
    font-size: 2.5rem;
    color: #1a202c;
    margin: 0;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    span {
      text-wrap: nowrap;
    }
  }

  .subtitle {
    color: #4a5568;
  }

  .result {
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
  }

  .result-title {
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 1rem 0;
  }

  .link-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
    
    input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      color: #4a5568;
      background: white;
    }
  }

  .copy-btn,
  .open-btn {
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: transform 0.1s, background 0.2s;
  }

  .copy-btn {
    background: #edf2f7;
    color: #2d3748;
  }

  .open-btn {
    background: #4299e1;
    color: white;
    text-decoration: none;
    
    &:hover {
      background: #3182ce;
    }
  }
</style>
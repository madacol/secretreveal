<script>
  import SecretTextarea from '$lib/components/SecretTextarea.svelte';
  import { fly } from 'svelte/transition';
  
  let secret = $state('');
  let hash = $state('');
  let shareableLink = $state('');
</script>

<main>
  <div class="container">
    <h1>Share a Secret</h1>
    <p class="subtitle">Create a link where your secret will be revealed</p>
    
    <SecretTextarea
      oninput={
        async function(event) {
          secret = event.currentTarget.value;
          
          if (secret) {
            const encoder = new TextEncoder();
            const data = encoder.encode(secret);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            shareableLink = `${window.location.origin}/secret/${hash}`;
          } else {
            hash = '';
            shareableLink = '';
          }
        }}
    />

    {#if shareableLink}
      <div class="result" in:fly={{ y: 20, duration: 300 }}>
        <p class="result-title">Your secret is ready to share</p>
        <div class="link-container">
          <input readonly value={shareableLink} />
          <button class="copy-btn" onclick={() => navigator.clipboard.writeText(shareableLink)}>
            Copy
          </button>
          <a href={shareableLink} target="_blank" rel="noopener" class="open-btn">View</a>
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    display: grid;
    place-items: center;
    padding: 2rem;
  }

  .container {
    background: white;
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    width: 100%;
    max-width: 600px;
  }

  h1 {
    font-size: 2.5rem;
    color: #1a202c;
    margin: 0;
    font-weight: 700;
  }

  .subtitle {
    color: #4a5568;
    margin: 0.5rem 0 2rem 0;
  }
  .result {
    margin-top: 2rem;
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
  }

  .link-container input {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: #4a5568;
    background: white;
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
  }

  .copy-btn:hover,
  .open-btn:hover {
    transform: translateY(-1px);
  }

  .copy-btn:active,
  .open-btn:active {
    transform: translateY(0);
  }

  .open-btn:hover {
    background: #3182ce;
  }
</style>
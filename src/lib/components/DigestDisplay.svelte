<script>
  let {
    digest = '',
    label = 'SHA-256 digest'
  } = $props();

  // Show first 8 and last 8 characters of digest
  let shortDigest = $derived(digest ? `${digest.slice(0, 8)}...${digest.slice(-8)}` : '');
</script>

<div class="digest-display">
  <span class="label">{label}</span>
  <code title={digest}>
    <span class="short-digest">{shortDigest}</span>
    <span class="full-digest">{digest}</span>
  </code>
</div>

<style>
  .digest-display {
    background: #f8fafc;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }

  .label {
    font-size: 0.875rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    display: block;
  }

  code {
    font-family: 'SF Mono', Consolas, Monaco, monospace;
    font-size: 0.75rem;
    color: #64748b;
    word-break: break-all;
    position: relative;
  }

  .full-digest {
    display: none;
  }

  code:hover .short-digest {
    display: none;
  }

  code:hover .full-digest {
    display: inline;
  }
</style>

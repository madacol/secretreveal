<script>
  let { digest = '', label = 'SHA-256 digest' } = $props();
</script>

<div class="digest-display">
  <span class="label">{label}</span>
  <code>{digest}</code>
</div>

<style>
  .digest-display {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
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
    font-size: 0.875rem;
    color: #334155;
    word-break: break-all;
  }
</style>

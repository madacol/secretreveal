<script>
  /** @type {{
   *    digest: string,
   *    label?: string
  }} */
  let {
    digest,
    label = 'SHA-256 digest'
  } = $props();
</script>

<div class="digest-display">
  <span class="label">{label}</span>
  <code title={digest}>{digest}</code>
</div>

<style>
  .digest-display {
    background: #f8fafc;
    padding: 0.75rem;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 10ch auto;
  }

  .label {
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    margin-right: 0.5rem;
    display: block;
  }

  code {
    font-family: 'SF Mono', Consolas, Monaco, monospace;
    font-size: 0.75rem;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

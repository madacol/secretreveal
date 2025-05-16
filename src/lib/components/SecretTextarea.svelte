<script>
  /** @type {import('svelte/elements').HTMLTextareaAttributes} */
  let { 
    value = $bindable(''),
    ...restProps
  } = $props();
</script>

<textarea
  bind:value
  {...restProps}
></textarea>

<style>
  textarea {
    width: 100%;
    min-height: 150px;
    padding: 1rem;
    box-sizing: border-box;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;
    resize: vertical;
    font-family: inherit;
  }

  textarea:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
</style>

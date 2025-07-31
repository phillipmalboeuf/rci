<script lang="ts">
  import type { TypeLienDeNavigationSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';

  let { lien, muted }: { lien: Entry<TypeLienDeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, muted?: boolean } = $props();
</script>

<a href={lien.fields.destination} class="button" class:button--muted={muted} target={lien.fields.externe ? '_blank' : '_self'}>
  {lien.fields.titre}
  {#if lien.fields.destination?.endsWith('.pdf')}
  <svg viewBox="0 0 15 14"><path d="M7.49967 10.8123L3.47884 6.7915L4.37467 5.89567L6.87467 8.39567V0.666504H8.12467V8.39567L10.6247 5.89567L11.5205 6.7915L7.49967 10.8123ZM2.08301 13.9998C1.74967 13.9998 1.45801 13.8748 1.20801 13.6248C0.958008 13.3748 0.833008 13.0832 0.833008 12.7498V9.77067H2.08301V12.7498H12.9163V9.77067H14.1663V12.7498C14.1663 13.0832 14.0413 13.3748 13.7913 13.6248C13.5413 13.8748 13.2497 13.9998 12.9163 13.9998H2.08301Z" fill="currentColor"/></svg>
  {/if}
</a>

<style lang="scss">
  a {
    svg {
      height: 1em;
      width: 1em;
    }
  }
</style>
<script lang="ts">
  import type { TypeText, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item, first, noTitle }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, first?: boolean, noTitle?: boolean } = $props()
</script>

<section class="flex flex--gapped flex--spaced text{item.fields.media ? '' : ' text--no-media'}" id={item.fields.id}>
  {#if item.fields.media}
  <div class="col col--5of12 col--portrait--12of12 media">
    <Media media={item.fields.media} />
  </div>
  {/if}
  {#if item.fields.corps || item.fields.liens?.length}
  <div class="col col--7of12 col--portrait--12of12 flex flex--column flex--gapped corps" class:col--12of12={!item.fields.media}>
    {#if item.fields.titre && !noTitle}
    <div class="col titre">
      <h3>{item.fields.titre}</h3>
    </div>
    {/if}

    {#if item.fields.corps}
    <Rich body={item.fields.corps} />
    {/if}

    {#if item.fields.liens?.length}
    <ul class="list--nostyle flex flex--gapped {item.fields.liens.length > 2 ? 'flex--column' : ''}">
      {#each item.fields.liens as lien}
      <li><a href={lien.fields.destination} class="button button--muted" target={lien.fields.externe ? '_blank' : '_self'}>{lien.fields.titre}</a></li>
      {/each}
    </ul>
    {/if}
  </div>
  {/if}
</section>

<style lang="scss">
  .text {
  }
</style>


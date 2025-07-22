<script lang="ts">
  import type { TypeBannerSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item }: { item: Entry<TypeBannerSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>

<section class="banner flex flex--column flex--gapped padded">
  {#if item.fields.media}
  <figure>
    <Media media={item.fields.media} />
  </figure>
  {/if}
  <div class="banner__content">
    <Rich body={item.fields.corps} />
  </div>
  {#if item.fields.liens?.length}
  <div class="banner__liens">
    {#each item.fields.liens as lien}
    <a href={lien.fields.destination} class="button" target={lien.fields.externe ? '_blank' : '_self'}>{lien.fields.titre}</a>
    {/each}
  </div>
  {/if}
</section>

<style lang="scss">
  .banner {
    &__content {
      :global(h1 > em),
      :global(h2 > em),
      :global(h3 > em),
      :global(h4 > em),
      :global(h5 > em),
      :global(h6 > em) {
        font-style: normal;
        opacity: 0.5;
      }
    }
  }
</style>
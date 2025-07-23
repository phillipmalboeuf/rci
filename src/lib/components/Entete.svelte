<script lang="ts">
  import type { TypeHeaderSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item }: { item: Entry<TypeHeaderSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>

<section class="entete bleu flex flex--gapped padded">

  <div class="entete__titre">
    <hr />
    <h1 class="h2">{item.fields.titre}</h1>
  </div>
  
  {#if item.fields.corps}
  <div class="entete__content flex flex--column flex--gapped flex--spaced flex--middle">
    {#if item.fields.media}
    <figure>
      <Media media={item.fields.media} />
    </figure>
    {/if}

    {#if item.fields.corps}
    <Rich body={item.fields.corps} />
    {/if}

    {#if item.fields.liens?.length}
    <div class="entete__liens">
      {#each item.fields.liens as lien}
      <a href={lien.fields.destination} class="button" target={lien.fields.externe ? '_blank' : '_self'}>{lien.fields.titre}</a>
      {/each}
    </div>
    {/if}
  </div>
  {/if}
</section>

<style lang="scss">
  .entete {
    padding-top: $s6;

    &__titre {
      flex: 1;
      margin-bottom: $s4;

      hr {
        margin: 0;
        height: 20px;
      }
    }

    &__content {
      max-width: 466px;
      min-height: 223px;

      padding: $s0;
      background-color: $bleu-pale;
      border-radius: $radius;
      text-align: center;

      @media (min-width: $tablet_portrait) {
        margin-bottom: calc($s6 * -1);
      }
    }
  }
</style>
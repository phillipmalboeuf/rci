<script lang="ts">
  import type { TypeHeaderSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item }: { item: Entry<TypeHeaderSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>

<section class="entete entete--{item.fields.format || 'Boîte'} bleu flex padded" class:flex--gapped={!(item.fields.format === 'Plein')}>

  <div class="entete__titre">
    <hr />
    <h1 class="h2">{item.fields.titre}</h1>
  </div>
  
  {#if item.fields.corps}
  <div class="entete__content">
    <div class="flex flex--column flex--spaced flex--gapped" class:flex--middle={!(item.fields.format === 'Plein')}>
      {#if item.fields.media}
      <figure>
        <Media media={item.fields.media} />
      </figure>
      {/if}

      {#if item.fields.format === 'Plein'}
      <hr />
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
  </div>
  {/if}
</section>

<style lang="scss">
  .entete {
    padding-top: $s6;

    &__titre {
      flex: 1;
      margin-bottom: $s4;
    }

    hr {
      margin: 0;
      height: 20px;
    }

    &--Plein {
      min-height: 66lvh;
      
      .entete__titre {
        // width: 100%;
      }

      .entete__content {
        width: 100%;
        max-width: 595px;
        margin-left: auto;
      }
    }

    &--Boîte {
      .entete__content {
        max-width: 466px;
        
        padding: $s0;
        background-color: $bleu-pale;
        border-radius: $radius;
        text-align: center;

        > div {
          width: 100%;
          min-height: 223px;
        }

        @media (min-width: $tablet_portrait) {
          margin-bottom: calc($s6 * -1);
        }

        @media (max-width: $tablet_portrait) {
          margin-top: auto;
        }
      }
    }

    @media (max-width: $tablet_portrait) {
      min-height: calc(100lvh - 65px);

      &:not(:has(> .entete__content)) {
        min-height: calc(60lvh - 65px);
      }
    }
  }
</style>
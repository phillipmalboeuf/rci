<script lang="ts">
  import type { TypeText, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Lien from './Lien.svelte';

  let { item, first, noTitle, card }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, first?: boolean, noTitle?: boolean, card?: boolean } = $props()
</script>

<section class="flex flex--gapped flex--spaced text{item.fields.media ? '' : ' text--no-media'} text--{item.fields.format} {{
  "Foncé": "bleu",
  "Moyen": "bleu-pale",
  "Gris": "gris",
  "Blanc": "blanc",
}[item.fields.couleur]}" class:card id={item.fields.id}>
  {#if item.fields.media && !card}
  <div class="col col--5of12 col--portrait--12of12 media">
    <Media media={item.fields.media} />
  </div>
  {/if}
  {#if item.fields.corps || item.fields.liens?.length}
  <div class="col col--portrait--12of12 flex flex--column flex--gapped corps" class:col--7of12={!card} class:col--12of12={!item.fields.media}>
    {#if item.fields.titre && !noTitle}
    <div class="col titre">
      <h3 class:h4={card}>{item.fields.titre}</h3>
    </div>
    {/if}

    {#if item.fields.corps}
    <Rich body={item.fields.corps} />
    {/if}

    {#if item.fields.liens?.length || (item.fields.media && card)}
    <ul class="list--nostyle flex flex--gapped {item.fields.liens?.length > 2 ? 'flex--column' : ''}" class:flex--bottom={item.fields.media && card}>
      {#if item.fields.media && card}
      <li>
        <Media media={item.fields.media} />
      </li>
      {/if}
      {#if item.fields.liens?.length}
      {#each item.fields.liens as lien}
      <li><Lien {lien} muted /></li>
      {/each}
      {/if}
    </ul>
    {/if}
  </div>
  {/if}
</section>

<style lang="scss">
  .text {

    &.text--Moyen {
      padding: $s6 $s2 $s2;

      @media (max-width: $tablet_portrait) {
        padding: $s6 $s0 $s0;
      }

      .corps {
        position: relative;
        padding: $s2;
        border-radius: $radius;
        max-width: 1275px;
        margin: 0 auto;

        @media (max-width: $tablet_portrait) {
          padding: $s0;
        }

        @media (min-width: $tablet_portrait) {
          > :global(*) {
            width: 50%;
            margin-left: auto;
          }
        }
      }

      &#policy .corps {
        @media (min-width: $tablet_portrait) {
          > :global(*) {
            margin-left: 0;
          }
        }
      }

      .titre {
        @media (min-width: $tablet_portrait) {
          position: absolute;
          top: 0;
          left: 0;
          padding: $s2;
          width: 33%;
        }

        @media (max-width: $tablet_portrait) {
          margin-bottom: $s4;
        }
      }

      &.blanc {
        .corps {
          background-color: $gris;
          --border-color: #{$muted};
        }
      }

      &.bleu-pale {
        .corps {
          background-color: rgba($blanc, 0.1);
          --border-color: #{rgba($blanc, 0.25)};
        }
      }

      &.bleu {
        .corps {
          background-color: $bleu-fonce;
          --border-color: #{rgba($blanc, 0.25)};
        }
      }
    }

    &.text--Plein {
      padding: $s6 $s2 $s2;

      @media (max-width: $tablet_portrait) {
        padding: $s6 $s0 $s0;
      }

      :global(table:first-child:nth-last-child(2) p:first-child) {
        font-size: $s3;

        @media (max-width: $tablet_portrait) {
          font-size: $s2;
        }
      }
    }

    &.card {
      flex-direction: column;
      padding: $s0;
      border-radius: calc($radius * 2);
      background-color: $blanc;
      box-shadow: 8px 4px 15px 0px rgba(0, 0, 0, 0.10);
      min-height: 100%;

      .titre {
        margin-bottom: $s0;
      }

      .corps {
        flex: 1;
        row-gap: $s4;
      }

      ul {
        margin-top: auto;

        li {
          :global(img) {
            height: $s5;
            width: auto;
            object-fit: contain;
          }

          &:has(:global(.button)) {
            margin-left: auto;
          }
        }
      }
    }
  }
</style>


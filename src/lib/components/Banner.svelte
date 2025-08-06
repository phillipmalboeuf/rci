<script lang="ts">
  import type { TypeBannerSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Lien from './Lien.svelte'

  let { item, previousCouleur }: { item: Entry<TypeBannerSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, previousCouleur?: typeof item.fields.couleur } = $props()

  let icon = $derived(item.fields.media && item.fields.format !== 'Plein')
</script>

<section class="banner banner--{item.fields.format || 'Plein'} padded {item.fields.format !== 'Plein'
? {
  "Foncé": "bleu",
  "Moyen": "bleu-pale",
  "Gris": "gris",
  "Blanc": "blanc",
}[previousCouleur]
: {
  "Foncé": "bleu",
  "Moyen": "bleu-pale",
  "Gris": "gris",
  "Blanc": "blanc",
}[item.fields.couleur]}">
  <div class="banner__inner flex flex--gapped {{
  "Foncé": "bleu",
  "Moyen": "bleu-pale",
  "Gris": "gris",
  "Blanc": "blanc",
}[item.fields.couleur]}" class:flex--column={!icon} class:flex--spaced={icon}>
    {#if item.fields.media}
    <figure class="col col--2of12 col--portrait--4of12" class:col--12of12={!icon}>
      <Media media={item.fields.media} mobileMedia={item.fields.mobileMedia} />
    </figure>
    {/if}
    <div class="banner__content flex flex--column flex--spaced flex--gapped col col--portrait--12of12" class:col--8of12={icon}>
      <Rich body={item.fields.corps} />
    </div>
    {#if item.fields.liens?.length}
    <div class="banner__liens flex flex--gapped flex--middle">
      {#each item.fields.liens as lien}
      <Lien {lien} />
      {/each}
    </div>
    {/if}
  </div>
</section>

<style lang="scss">
  .banner {
    padding-top: $s4;
    padding-bottom: $s4;

    &--Moyen {
      .banner__inner {
        max-width: 966px;
        margin: 0 auto;

        .banner__liens {
          margin-top: $s4;
        }
      }
    }

    &--Grand,
    &--Moyen {
      padding-top: $s6;
      padding-bottom: $s6;

      .banner__inner {
        padding: $s0;
        border-radius: $radius;

        @media (max-width: $tablet_portrait) {
          padding: $s-2;
        }

        &.flex--spaced {
          padding: $s3;

          @media (max-width: $tablet_portrait) {
            padding: $s-1;

            figure {
              margin-bottom: $s2;
            }
          }
        }
      }

      
    }

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
<script lang="ts">
  import type { TypeBannerSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item, previousCouleur }: { item: Entry<TypeBannerSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, previousCouleur?: typeof item.fields.couleur } = $props()
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
  <div class="banner__inner flex flex--column flex--gapped {{
  "Foncé": "bleu",
  "Moyen": "bleu-pale",
  "Gris": "gris",
  "Blanc": "blanc",
}[item.fields.couleur]}">
    {#if item.fields.media}
    <figure>
      <Media media={item.fields.media} />
    </figure>
    {/if}
    <div class="banner__content flex flex--column flex--spaced flex--gapped">
      <Rich body={item.fields.corps} />
    </div>
    {#if item.fields.liens?.length}
    <div class="banner__liens flex flex--gapped flex--middle">
      {#each item.fields.liens as lien}
      <a href={lien.fields.destination} class="button" target={lien.fields.externe ? '_blank' : '_self'}>{lien.fields.titre}</a>
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
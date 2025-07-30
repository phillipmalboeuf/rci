<script lang="ts">
  import { type TypeListeSkeleton, type TypeTextSkeleton, isTypeLienDeNavigation, isTypeMembre, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import Text from './Text.svelte'
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Member from './Member.svelte'

  let { item }: { item: Entry<TypeListeSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'> } = $props()
</script>

<section class="flex flex--gapped padded {{
  "Foncé": "bleu",
  "Moyen": "bleu-pale",
  "Gris": "gris",
  "Blanc": "blanc",
}[item.fields.couleur]}" id={item.fields.id}>
  {#if item.fields.titre}
  <div class="col col--12of12 col--mobile--12of12 titre">
    <hr />
    <h4>{@html item.fields.titre}</h4>
  </div>
  {/if}

  {#if item.fields.corps}
  <div class="col col--6of12 col--mobile--12of12 flex flex--column flex--gapped corps">
    <Rich body={item.fields.corps} />

    {#if item.fields.liens?.length && !item.fields.grandsBoutons}
    <ul class="list--nostyle flex flex--gapped">
      {#each item.fields.liens as lien}
      <li><a href={lien.fields.destination} class="button" target={lien.fields.externe ? '_blank' : '_self'}>{lien.fields.titre}</a></li>
      {/each}
    </ul>
    {/if}
  </div>
  {/if}

  {#if item.fields.items?.length}
  <ul class="list--nostyle col col--portrait--12of12 flex flex--gapped" class:col--6of12={item.fields.type === 'Accordéon'} class:flex--center={item.fields.type === 'Feed'} class:flex--stretch={item.fields.type === 'Grille'}>
    {#each item.fields.items as listItem}
    <li class="col col--portrait--12of12" class:col--12of12={item.fields.type === 'Accordéon'} class:col--10of12={item.fields.type === 'Feed'} class:col--3of12={item.fields.type === 'Grille' && isTypeMembre(listItem)} class:col--4of12={item.fields.type === 'Grille' && isTypeText(listItem)} class:gris={item.fields.type === 'Feed'}>
      {#if item.fields.type === 'Accordéon'}
      <details name={item.sys.id}>
        {#if isTypeText(listItem)}
        <summary class="flex flex--gapped flex--middle flex--spaced"><h5>{listItem.fields.titre}</h5> <svg width="14" height="8" viewBox="0 0 14 8"><path d="M1 1.14307L7 6.85735L13 1.14307" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.47665"/></svg></summary>
        <article class="flex flex--column flex--gapped">
          <hr>
          <Text item={listItem} noTitle />
        </article>
        {/if}
      </details>
      {:else}
      {#if isTypeText(listItem)}
      <Text item={listItem} card={item.fields.type === 'Grille'} />
      {:else if isTypeMembre(listItem)}
      <Member item={listItem} />
      {/if}
      {/if}
    </li>
    {/each}
  </ul>
  {/if}

  {#if item.fields.liens?.length && item.fields.grandsBoutons}
  <ul class="list--nostyle flex flex--gapped boutons">
    {#each item.fields.liens as lien}
    <li><a href={lien.fields.destination} class="button button--large button--full" target={lien.fields.externe ? '_blank' : '_self'}>{lien.fields.titre}</a></li>
    {/each}
  </ul>
  {/if}
</section>

<style lang="scss">
  section {
    padding-top: $s6;
    padding-bottom: $s6;

    .titre {
      margin-bottom: $s3;

      hr {
        margin: 0;
        height: 20px;
      }
    }

    .corps {
      @media (min-width: $tablet_portrait) {
        padding-right: $s4;
      }
    }

    .flex--stretch {
      // row-gap: $s6;

      .col--4of12 {
        margin-top: $s6;
      }
    }

    .flex--center {
      .gris {
        padding: $s-2;
        border-radius: $radius;
      }

      :global(.text:not(.text--no-media)) {
        align-items: stretch;
      }

      :global(.media img),
      :global(.media picture) {
        height: 100%;
        object-fit: cover;

        @media (min-width: $tablet_portrait) {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }
      }

      :global(.text:not(.text--no-media) .corps) {
        justify-content: space-between;
      }

      :global(.text--no-media .corps) {
        flex-direction: row;
      }

      :global(.text--no-media .corps ul) {
        width: auto;
        margin-left: auto;
      }
    }

    details {
      padding: $s-2;
      border-radius: calc($radius / 2);
      background-color: rgba($bleu-pale, 0.05);
      margin-bottom: calc($s-3 * -1);

      summary {
        cursor: pointer;

        svg {
          transition: transform 0.333s;
          transform: rotate(0deg);
        }
      }

      article {
        hr {
          opacity: 0.25;
        }
      }

      &[open] {
        summary {
          svg {
            transform: rotate(180deg);
          }
        }
      }
    }

    &.bleu {
      details {
        background-color: rgba($blanc, 0.05);
      }
    }

    &.bleu-pale {
      details {
        background-color: rgba($blanc, 0.1);
      }
    }

    .boutons {
      margin-top: $s4;

      li {
        flex: 1;

        @media (max-width: $tablet_portrait) {
          flex: none;
          width: 100%;
        }
      }
    }
  }
</style>
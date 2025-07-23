<script lang="ts">
  import { type TypeListeSkeleton, type TypeTextSkeleton, isTypeLienDeNavigation, isTypeMembre, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import Text from './Text.svelte'
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Member from './Member.svelte'

  let { item }: { item: Entry<TypeListeSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'> } = $props()
</script>

<section class="flex flex--gapped padded" id={item.fields.id}>
  {#if item.fields.titre}
  <div class="col col--12of12 col--mobile--12of12 titre">
    <hr />
    <h4>{@html item.fields.titre}</h4>
  </div>
  {/if}

  {#if item.fields.corps}
  <div class="col col--6of12 col--mobile--12of12 flex flex--column flex--gapped corps">
    <Rich body={item.fields.corps} />

    <!-- {#if item.fields.liens?.length}
    <ul class="list--nostyle flex flex--gapped">
      {#each item.fields.liens as lien}
      <li><a href={lien.fields.route}><u>{lien.fields.titre}</u></a></li>
      {/each}
    </ul>
    {/if} -->
  </div>
  {/if}

  {#if item.fields.items?.length}
  <ul class="list--nostyle col flex flex--gapped" class:col--6of12={item.fields.type === 'Accordéon'} class:flex--center={item.fields.type === 'Feed'}>
    {#each item.fields.items as listItem}
    <li class="col" class:col--12of12={item.fields.type === 'Accordéon'} class:col--8of12={item.fields.type === 'Feed'} class:col--3of12={item.fields.type === 'Grille'}>
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
      <Text item={listItem} />
      {:else if isTypeMembre(listItem)}
      <Member item={listItem} />
      {/if}
      {/if}
    </li>
    {/each}
  </ul>
  {/if}
</section>

<style lang="scss">
  section {
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

    ul {
      li {
      }
    }

    details {
      padding: $s-2;
      border-radius: $radius;
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
  }
</style>
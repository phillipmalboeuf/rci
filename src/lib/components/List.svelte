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
  <div class="col col--12of12 col--mobile--12of12">
    <h2>{@html item.fields.titre.replaceAll('Capitale-Nationale', '<span class="nobr">Capitale-Nationale</span>')}</h2>
  </div>
  {/if}

  {#if item.fields.corps}
  <div class="col col--6of12 col--mobile--12of12 flex flex--column flex--gapped">
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
  <ul class="list--nostyle col flex flex--gapped" class:col--6of12={item.fields.type === 'Accordéon'}>
    {#each item.fields.items as listItem}
    <li class="col" class:col--12of12={item.fields.type === 'Accordéon'} class:col--8of12={item.fields.type === 'Feed'} class:col--3of12={item.fields.type === 'Grille'}>
      {#if item.fields.type === 'Accordéon'}
      <details name={item.sys.id}>
        {#if isTypeText(listItem)}
        <summary class="flex flex--gapped flex--middle flex--spaced"><h4>{listItem.fields.titre}</h4> <span class="h4"></span></summary>
        <article><Text item={listItem} /></article>
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
    h2 {
      // margin-bottom: $s2;
    }

    ul {
      li {
      }
    }

    details {
      border-top: 1px solid;

      summary {
        cursor: pointer;
        padding: $s0 0;

        @media (min-width: $tablet_landscape) {
          padding: $s2 0;
        }

        span {
          &:before {
            content: '+';
          }
        }
      }

      article {
        padding: $s0 0;

        @media (min-width: $tablet_landscape) {
          padding: $s2 0;
        }

        :global(table) {
          // max-width: 50%;
          // margin: 0 auto;

          @media (max-width: $mobile) {
            max-width: 100%;
          
            :global(tr) {
              display: flex;
              flex-direction: column;
            }

            :global(th),
            :global(td) {
              width: 100%;
              margin-bottom: $s1;
            }
          }
        }
      }

      &[open] {
        summary {
          span {
            &:before {
              content: '–';
            }
          }
        }
      }
    }
  }
</style>
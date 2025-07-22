<script lang="ts">
  import { type TypeListeSkeleton, type TypeTextSkeleton, isTypeLienDeNavigation, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import Text from './Text.svelte'
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

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
  <ul class="list--nostyle col col--12of12 flex flex--gapped">
    {#each item.fields.items as listItem}
    <li class="col">
      {#if item.fields.type === 'Accordéon'}
      <details name={item.sys.id}>
        {#if isTypeText(listItem)}
        <summary class="flex flex--gapped flex--middle flex--spaced"><h2>{listItem.fields.titre}</h2> <span class="h3"></span></summary>
        <article><Text item={listItem} /></article>
        {/if}
      </details>
      {:else}
      {#if isTypeText(listItem)}
      <Text item={listItem} />
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
      margin: $s5 0;

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
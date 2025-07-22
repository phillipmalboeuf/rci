<script lang="ts">
  import { onMount } from 'svelte'
  import type { Entry } from 'contentful'
  
  // import { isTypeGrid, isTypeHero, isTypeList, isTypeText, type TypeTextSkeleton } from '$lib/clients/content_types'
  // import Hero from '$lib/components/Hero.svelte'
  // import Text from '$lib/components/Text.svelte'
  // import List from '$lib/components/List.svelte'
  // import Grid from '$lib/components/Grid.svelte'
  
  // import { headerState } from '$lib/stores/header.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<section class="bleu padded">
  <h2>Votre partenaire pour la maintenance, la réhabilitation et la modernisation de matériel roulant</h2>
</section>

<!-- {#if data.page.fields.content?.length}
{#each data.page.fields.content as item, i (item.sys.id)}
<section class="{item.sys.contentType.sys.id}">
  {#if isTypeHero(item)}
  <Hero {item} />
  {:else if isTypeText(item)}
  <Text {item} />
  {:else if isTypeList(item)}
  <List list={item} />
  {:else if isTypeGrid(item)}
  <Grid grid={item} />
  {/if}
</section>
{/each}
{/if} -->


<style lang="scss">
  section {
    margin: $s7 0;

    &:first-child {
      margin-top: 0;
    }

    // &.hero:first-child {
    //   margin-top: -130px;

    //   @media (max-width: $tablet_portrait) {
    //     margin-top: -90px;
    //   }
    // }

    // &.hero + &.hero {
    //   margin-top: calc($s7 * -1);
    // }
  }
</style>
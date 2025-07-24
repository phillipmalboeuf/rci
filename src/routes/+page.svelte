<script lang="ts">
  import { onMount } from 'svelte'
  import type { Entry } from 'contentful'
  
  import { isTypeBanner, isTypeHeader, isTypeListe, isTypeText, isTypeGallerie, type TypeBannerSkeleton } from '$lib/clients/content_types'
  import Banner from '$lib/components/Banner.svelte'
  import Text from '$lib/components/Text.svelte'
  import List from '$lib/components/List.svelte'
  import Entete from '$lib/components/Entete.svelte'
  import Gallerie from '$lib/components/Gallerie.svelte'
  
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

{#if data.page.fields.contenu?.length}
{#each data.page.fields.contenu as item, i (item.sys.id)}
<section class="{item.sys.contentType.sys.id}">
  {#if isTypeBanner(item)}
  <Banner {item} previousCouleur={(data.page.fields.contenu[i - 1] as Entry<TypeBannerSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">)?.fields.couleur} />
  {:else if isTypeText(item)}
  <Text {item} />
  {:else if isTypeListe(item)}
  <List {item} />
  {:else if isTypeHeader(item)}
  <Entete {item} />
  {:else if isTypeGallerie(item)}
  <Gallerie {item} />
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {
    // margin: $s7 0;

    // &:first-child {
    //   margin-top: 0;
    // }

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
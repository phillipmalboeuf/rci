<script lang="ts">
  import { onMount } from 'svelte'
  import type { Entry } from 'contentful'
  
  import { isTypeBanner, isTypeHeader, isTypeListe, isTypeText, isTypeGallerie, type TypeBannerSkeleton, isTypeNavigation } from '$lib/clients/content_types'
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
  {:else if isTypeNavigation(item)}
  <nav class="padded">
    <ul class="list--nostyle flex flex--tight_gapped">
      {#each item.fields.liens as lien}
      <li><a class="button button--muted" href={lien.fields.destination}>{lien.fields.titre}</a></li>
      {/each}
    </ul>
  </nav>
  {:else if isTypeText(item)}
  <Text {item} />
  {:else if isTypeListe(item)}
  <List {item} />
  {:else if isTypeHeader(item)}
  <Entete {item} />
  {:else if isTypeGallerie(item)}
  <Gallerie {item} previousCouleur={(data.page.fields.contenu[i - 1] as Entry<TypeBannerSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">)?.fields.couleur} />
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

  nav {
    width: 66%;

    @media (max-width: $tablet_portrait) {
      width: 100%;
    }
  }
</style>
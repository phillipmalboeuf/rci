<script lang="ts">
  import type { TypeMembreSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item, first }: { item: Entry<TypeMembreSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, first?: boolean } = $props()
</script>

<section class="member">
  
  <figure>
    {#if item.fields.photo}
    <Media media={item.fields.photo} />
    {/if}
  </figure>

  {#if item.fields.bio}
  <div class="flex flex--column flex--gapped flex--spaced bio">
    {#if item.fields.titre}
    <div class="col">
      <h5>
        {item.fields.prenom} {item.fields.nom}<br>
        <em>{item.fields.titre}</em>
      </h5>
    </div>
    {/if}

    {#if item.fields.bio}
    <Rich body={item.fields.bio} />
    {/if}

    <div class="flex flex--gapped flex--spaced flex--end">
      {#if item.fields.membre}
      <div>
        <small>Membre</small><br>
        <strong>{item.fields.membre}</strong>
      </div>
      {/if}
      {#if item.fields.linkedIn}
      <a href={item.fields.linkedIn} class="button" target="_blank">LinkedIn</a>
      {/if}
    </div>
  </div>
  {/if}
</section>

<style lang="scss">
  .member {
    position: relative;
    border-radius: $radius;
    overflow: hidden;

    &:hover,
    &:focus-visible {
      box-shadow: 8px 4px 15px 0px rgba(0, 0, 0, 0.10);

      .bio {
        opacity: 1;
      }
    }

    .bio {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $blanc;
      opacity: 0;
      transition: opacity 0.333s;
      padding: $s0;

      h5 {
        em {
          font-style: normal;
          opacity: 0.5;
        }
      }
    }
  }
</style>


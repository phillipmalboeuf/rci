<script lang="ts">
  import type { TypeMembreSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item, first }: { item: Entry<TypeMembreSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, first?: boolean } = $props()
</script>

<section class="member">
  <div class="card">
    <figure class="photo">
      {#if item.fields.photo}
      <Media media={item.fields.photo} ar={1.5} />
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
        <a href={item.fields.linkedIn} class="button button--muted" target="_blank">LinkedIn</a>
        {/if}
      </div>
    </div>
    {/if}
  </div>
</section>

<style lang="scss">
  .member {
    position: relative;
    perspective: 2000px;

    .card {
      border-radius: $radius;
      transition: transform 0.666s, box-shadow 0.666s;
      transform-style: preserve-3d;
    }

    &:hover,
    &:focus-visible {
      z-index: 2;

      .card {
        transform: rotateY(-180deg);
        box-shadow: -8px 4px 15px 0px rgba(0, 0, 0, 0.10);
      }
    }

    .photo,
    .bio {
      position: relative;
      backface-visibility: hidden;
      transform: rotateY(0deg);
      border-radius: $radius;
      overflow: hidden;
    }

    .photo {
      // background-color: $bleu-pale;
    }

    .bio {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $blanc;
      padding: $s0;
      transform: rotateY(180deg);
      overflow-y: auto;

      h5 {
        em {
          font-style: normal;
          opacity: 0.5;
        }
      }
    }
  }
</style>


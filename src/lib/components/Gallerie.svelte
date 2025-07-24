<script lang="ts">
  import { type TypeGallerieSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'
  import AutoHeight from 'embla-carousel-auto-height'
  import type { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel'

  import Media from './Media.svelte'
  import Dots from './Dots.svelte'

  let embla: EmblaCarouselType = $state()

  const options: EmblaOptionsType = {
    loop: true,
    dragFree: false,
    skipSnaps: true,
    align: 'start'
  }
  const plugins: EmblaPluginType[] = [
    Autoplay({
    //   delay: 0,
    //   stopOnInteraction: false,
    }),
    AutoHeight({
      
    })
  ]

  let { item }: { item: Entry<TypeGallerieSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'> } = $props()
</script>

<section class="gallerie" id={item.fields.id}>
  {#if item.fields.photos && item.fields.photos.length > 0}
  <div class="embla" use:emblaCarouselSvelte={{ options: {
    ...options,
  }, plugins, }} onemblaInit={e => embla = e.detail}>
  <ul class="list--nostyle embla__container">
    {#each item.fields.photos as media}
    <li class="embla__slide" style:--slide-width={'100%'}>
      <figure>
        <Media {media} />
      </figure>
    </li>
    {/each}
  </ul>
  <button class="embla__prev button--none" onclick={() => embla?.scrollPrev()} aria-label="Précédent"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16"/><path d="M17.9453 11.0988L12.4813 16.836L17.9453 22.5733" stroke="white" stroke-width="1.41198"/></svg></button>
  <button class="embla__next button--none" onclick={() => embla?.scrollNext()} aria-label="Suivant"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" transform="rotate(-180 16 16.7502)"/><path d="M14.0547 22.4016L19.5187 16.6643L14.0547 10.9271" stroke="white" stroke-width="1.41198"/></svg></button>

  {#if embla && item.fields.photos.length < 8}
  <Dots dots={item.fields.photos.length} slider={embla} />
  {/if}
  </div>
  {/if}
</section>

<style lang="scss">
  .gallerie {
    padding: $s6;

    .embla {
      overflow: hidden;
      position: relative;

      .embla__container {
        display: flex;
        align-items: flex-start;
        transition: height 0.333s;
      }

      .embla__slide {
        --slide-width: auto;
        flex: 0 0 var(--slide-width);
        min-width: 0;
        max-width: none;
        width: var(--slide-width);
        // height: 50lvh;
        
        padding: 0 calc($s0 / 2);

        @media (max-width: $mobile) {
          --slide-width: 100%;
        }

        figure {
          // aspect-ratio: var(--ar);
          width: 100%;
          padding: 0 calc($s4);
          // height: 50lvh;
        }

        :global(img),
        :global(video),
        :global(picture) {
          border-radius: $radius;
          // width: auto;
          // height: 100%;
        }
      }

      > button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        &.embla__prev {
          left: 0;
        }

        &.embla__next {
          right: 0;
        }
      }
    }
  }  
</style>
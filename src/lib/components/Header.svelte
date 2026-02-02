<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { fly } from 'svelte/transition'
  import { onNavigate } from '$app/navigation'
  import { localizeHref } from '$lib/paraglide/runtime'
  import { getLocalizedHref } from '$lib/utils/localize'
  
  import Locales from './Locales.svelte'
  // import Icon from './Icon.svelte'
  // import Footer from './Footer.svelte'
  
  // import { headerState } from '$lib/stores/header.svelte'

  let { navigations }: {
    navigations: { [key: string]: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> }
    // form: Entry<TypeFormSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // buttons: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let scrollY = $state(0)
  let innerHeight = $state(1000)
  let headerHeight = $state(0)
  let lastScrollY = 0
  let menuOpen = $state(false)

  $effect(() => {
    // if (menuOpen && scrollY < 45) {
    //   window.scrollTo({ top: 45, behavior: 'instant' })
    // }
    document.documentElement.classList.toggle('noscroll', menuOpen)
  })

  function onScroll() {
    lastScrollY = scrollY < 0 ? 0 : scrollY
  }

  onNavigate(() => {
    menuOpen = false
  })
</script>

<svelte:window bind:scrollY bind:innerHeight onscroll={onScroll} />

<header bind:offsetHeight={headerHeight} class="padded bleu flex flex--middle flex--gapped flex--spaced" class:open={menuOpen}>
  <nav class="logo-nav flex flex--spaced">
    <a href={localizeHref('/')}>
      <img src="/logo.svg" alt="RIC" />
    </a>
    <button class="button--none" aria-controls="menu" aria-expanded={menuOpen ? 'true' : 'false'} onclick={() => menuOpen = !menuOpen} aria-label="Menu">
      <svg width="41" height="41" viewBox="0 0 41 41" class:open={menuOpen}>
        <circle cx="20.75" cy="20.75" r="20.25"/>
        <line x1="10.625" y1="13.1753" x2="30.875" y2="13.1753" stroke="#14253D" stroke-width="3"/>
        <line x1="10.625" y1="20.2622" x2="30.875" y2="20.2622" stroke="#14253D" stroke-width="3"/>
        <line x1="10.625" y1="27.3501" x2="30.875" y2="27.3501" stroke="#14253D" stroke-width="3"/>
      </svg>
    </button>
  </nav>
  <nav class="main-nav flex flex--gapped flex--middle" class:open={menuOpen} id="menu">
    <hr>
    {#each navigations.principal.fields.liens as link}
      <a href={getLocalizedHref(link.fields.destination, link.fields.externe)} target={link.fields.externe ? '_blank' : undefined}>{link.fields.titre}</a>
    {/each}
    <Locales />
  </nav>
  <!-- <nav class="menu-nav">
    <button class="button--none" aria-controls="menu" aria-expanded={menuOpen ? 'true' : 'false'} onclick={() => menuOpen = !menuOpen}>
      {#if menuOpen}
        <Icon icon="close" label="Close" />
      {:else}
        <Icon icon="menu" label="Menu" />
      {/if}
    </button>
    {#if menuOpen}
    <dialog open id="menu" transition:fly={{ x: '100%', opacity: 1, duration: 666 }}>
    </dialog>
    {/if}
  </nav> -->
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    z-index: 100;

    button[aria-controls="menu"] {
      svg {
        line {
          transition: opacity 0.333s, transform 0.333s;
          transform-origin: center center;
        }
      }
    }

    &.open {
      button[aria-controls="menu"] {
        svg {
          line {
            &:nth-of-type(2) {
              opacity: 0;
            }

            &:nth-of-type(1) {
              transform: rotate(45deg) translateY(16%);
            }

            &:nth-of-type(3) {
              transform: rotate(-45deg) translateY(-16%);
            }
          }
        }
      }
    }
  }

  // header {
  //   // position: fixed;
  //   // top: 0;
  //   // left: 0;
  //   width: 100%;
  //   // z-index: 100;
  //   // color: $blanc;
  //   // transition: background-color 666ms, color 666ms;

  //   // &.hide {
  //   //   transform: translateY(-100%);
  //   // }

  //   &.dark {
  //     // background-color: fade-out($blanc, 0.1);
  //     // backdrop-filter: blur(10px);
  //     color: $noir;
  //   }
  // }

    nav {
      width: auto;
      // transition: color 666ms;
      position: relative;
      z-index: 99;

      a,
      :global(button) {
        transition: opacity 0.333s;

        &:hover,
        &:focus-visible {
          opacity: 0.5;
        }
      }

      :global(button) {
        @media (min-width: $tablet_portrait) {
          transition: opacity 0.333s;
          opacity: 0.5;

          &:hover,
          &:focus-visible {
            opacity: 1;
          }
        }
      }

      &.logo-nav {
        @media (max-width: $tablet_portrait) {
          position: relative;
          z-index: 1;
          width: 100%;
        }

        @media (min-width: $tablet_portrait) {
          button {
            display: none;
          }
        }
      }

      &.main-nav {
        hr {
          display: none;
        }

        @media (max-width: $tablet_portrait) {
          position: absolute;
          bottom: 100%;
          right: 0;
          width: 100%;
          height: 100lvh;
          background-color: $bleu;
          z-index: 0;
          transition: transform 0.666s;
          flex-direction: column;
          align-items: flex-start;
          --gap: 0;

          padding: $s8 $s-1 $s0;

          &.open {
            transform: translateY(100%);
          }

          hr {
            display: block;
            width: 100%;
            height: 20px;
            background-color: $bleu-pale;
            margin: $s5 0 0;
          }

          a,
          :global(button) {
            width: 100%;
            justify-content: flex-start;
            font-size: $s4;
            padding: 0;
            border-bottom: 2px solid $bleu-pale;
          }
        }
      }
    }
</style>
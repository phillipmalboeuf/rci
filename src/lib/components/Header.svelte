<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { fly } from 'svelte/transition'
  import { onNavigate } from '$app/navigation'
  
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
    <a href="/">
      <img src="/logo.svg" alt="RIC" />
    </a>
    <button class="button--none" aria-controls="menu" aria-expanded={menuOpen ? 'true' : 'false'} onclick={() => menuOpen = !menuOpen} aria-label="Menu">
      <svg width="41" height="41" viewBox="0 0 41 41" ><circle cx="20.75" cy="20.75" r="20.25"/><line x1="10.625" y1="20.2622" x2="30.875" y2="20.2622" stroke="#14253D" stroke-width="3"/><line x1="10.625" y1="27.3501" x2="30.875" y2="27.3501" stroke="#14253D" stroke-width="3"/><line x1="10.625" y1="13.1753" x2="30.875" y2="13.1753" stroke="#14253D" stroke-width="3"/></svg>
    </button>
  </nav>
  <nav class="main-nav flex flex--gapped flex--middle" class:open={menuOpen} id="menu">
    <hr>
    {#each navigations.principal.fields.liens as link}
      <a href={link.fields.destination} target={link.fields.externe ? '_blank' : undefined}>{link.fields.titre}</a>
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
        transition: color 0.333s;

        &:hover,
        &:focus-visible {
          color: $bleu-pale;
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

          padding: $s8 $s-1;

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
            // padding: $s-3 0;
            border-bottom: 2px solid $bleu-pale;
          }
        }
      }
    }

    //   color: $noir;

    //   &.dark {
    //     color: $blanc;
    //   }
      
    //   a {
    //     transition: transform 333ms;

    //     &:hover,
    //     &:focus-visible {
    //       font-style: italic;
    //       transform: translateY(-3px);
    //     }
    //   }

    //   &.main-nav {
    //     margin-left: auto;

    //     @media (max-width: $tablet_portrait) {
    //       display: none;
    //     }
    //   }

    //   &:not(.main-nav) {
    //     position: sticky;
    //     top: 0;
    //     z-index: 100;
    //   }

    //   &.logo-nav {
    //     padding-bottom: $s-2;
    //     z-index: 102;

    //     &.open {
    //       color: $noir !important;
    //     }

    //     @media (max-width: $tablet_portrait) {
    //       :global(svg) {
    //         height: 22px;
    //         width: auto;
    //       }
    //     }
    //   }

    //   &.menu-nav {
        
    //     &.open {

    //       button {
    //         color: $noir;
    //       }
    //     }

    //     @media (max-width: $tablet_portrait) {
    //       margin-left: auto;
    //     }

    //     button {
    //       position: relative;
    //       z-index: 101;

    //       :global(svg) {
    //         transition: transform 333ms;
    //       }

    //       &:hover,
    //       &:focus-visible {
    //         :global(svg) {
    //           transform: scale(1.25);
    //         }
    //       }

    //       @media (max-width: $tablet_portrait) {
    //         :global(svg) {
    //           height: 22px;
    //           width: auto;
    //         }
    //       }
    //     }

    //     dialog {
    //       position: fixed;
    //       top: 0;
    //       right: 0;
    //       width: 100%;
    //       height: 100%;
    //       z-index: 100;
    //     }
    //   }
    // }
</style>
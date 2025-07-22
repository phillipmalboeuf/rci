<script lang="ts">
	import { setLocale, getLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
</script>

{#if getLocale() !== 'fr'}
<button class="button--none" onclick={() => setLocale('fr')}>Français</button>
{/if}
{#if getLocale() !== 'en'}
<button class="button--none" onclick={() => setLocale('en')}>English</button>
{/if}
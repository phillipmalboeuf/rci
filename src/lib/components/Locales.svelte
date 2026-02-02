<script lang="ts">
	import { getLocale, localizeHref, deLocalizeHref, setLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	function switchLocale(newLocale: 'fr' | 'en') {
		// First de-localize the current path to get the base path
		const basePath = deLocalizeHref(page.url.pathname);
		// Then localize it to the new locale
		const localizedPath = localizeHref(basePath, { locale: newLocale });
		// goto(localizedPath, { invalidateAll: true, replaceState: true });
		setLocale(newLocale);
	}
</script>

{#if getLocale() !== 'fr'}
<button class="button--none" onclick={() => switchLocale('fr')}>Français</button>
{/if}
{#if getLocale() !== 'en'}
<button class="button--none" onclick={() => switchLocale('en')}>English</button>
{/if}
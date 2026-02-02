import { localizeHref } from '$lib/paraglide/runtime';

/**
 * Localizes a href for internal links, leaves external links unchanged
 * @param destination - The destination URL
 * @param externe - Whether the link is external
 * @returns The localized href for internal links, or the original href for external links
 */
export function getLocalizedHref(destination: string | undefined, externe?: boolean): string {
	if (!destination) return '/';
	// External links (http/https) or explicitly marked as external should not be localized
	if (destination.startsWith('http') || externe) {
		return destination;
	}
	// Internal links should be localized
	return localizeHref(destination);
}

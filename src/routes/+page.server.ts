
import type { TypeNavigationSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { getLocale } from '$lib/paraglide/runtime'


export const load = async ({ request }) => {

  const [page] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: 'page', include: 3, "fields.id": "accueil", locale: { 'en': 'en-CA' }[getLocale()] || 'fr-CA' }),
  ])

  return {
    page: page.items[0],
  }
}
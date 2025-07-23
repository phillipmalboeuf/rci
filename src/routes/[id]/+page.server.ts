import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { getLocale } from '$lib/paraglide/runtime'
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
  const [items] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ 
      content_type: 'page', 
      include: 3, 
      "fields.id": params.id, 
      locale: { 'en': 'en-CA' }[getLocale()] || 'fr-CA'
    }),
  ])

  if (items.items.length === 0) {
    throw error(404, 'Page non trouvée')
  }

  return {
    page: items.items[0],
  }
}
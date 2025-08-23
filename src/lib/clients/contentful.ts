import { PREVIEW } from '$env/static/private'
import { dev } from '$app/environment'
import { createClient } from 'contentful'

const preview = PREVIEW === 'true'
export const content = createClient({
  space: 'xq8w9oa8sl49',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? '-DndDVfWMAbwdJ2R4LxV7JhvTamOA_aiDIfmM0Ll8vw' : 'X55w1V86QP86Wa_vqzxmsy35m4jUqqm9Lbw27utCeUE',
}).withoutUnresolvableLinks
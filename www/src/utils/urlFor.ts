import imageUrlBuilder from '@sanity/image-url'
import {client} from '../config/sanity'
import {SanityImageAsset} from '../sanity.types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageAsset) {
  return builder.image(source)
}

import {createClient} from '@sanity/client'
import groq from 'groq'
import {MainResult} from '../sanity.types'

export const client = createClient({
  // 1nq388dx
  projectId: '1nq388dx',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03',
})

export async function getData() {
  const query = groq`*[_type=='main']{..., projects[]->}[0]`
  const data: MainResult = await client.fetch(query)

  return data
}

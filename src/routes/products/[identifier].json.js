import json from 'json-complete'
import contentful from '../../clients/contentful'

export async function get({ locale, params, query }, res) {
  const { identifier } = params
	const products = await contentful.getEntries({ content_type: 'product', locale, select: 'sys.id,fields.title,fields.identifier,fields.description,fields.photos,fields.price,fields.comingSoon,fields.colors', 'fields.identifier': identifier })

  let { collection } = query
  if (collection) {
    collection = (await contentful.getEntries({ content_type: 'collection', locale, select: 'sys.id,fields.title,fields.identifier', 'fields.identifier': collection })).items[0]
  }

  if (products.total) {
    res.end(json.encode({ product: products.items[0], collection }))
  } else {
    res.writeHead(404)
    res.end(json.encode({ product: undefined, collection }))
  }
}
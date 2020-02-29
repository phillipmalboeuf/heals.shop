import json from 'json-complete'
import contentful from '../../clients/contentful'

export async function get({ locale, params, query }, res) {
  const { identifier } = params
	const [products, collection, materials] = await Promise.all([
    contentful.getEntries({ content_type: 'product', locale, select: 'sys.id,fields.title,fields.identifier,fields.description,fields.photos,fields.price,fields.comingSoon,fields.materials', 'fields.identifier': identifier }),
    query.collection && (await contentful.getEntries({ content_type: 'collection', locale, select: 'sys.id,fields.title,fields.identifier', 'fields.identifier': query.collection })).items[0],
    contentful.getEntries({ content_type: 'material', locale, select: 'sys.id,fields.name,fields.description,fields.photo'})
  ])

  if (products.total) {
    res.end(json.encode({ product: products.items[0], collection, materials }))
  } else {
    res.writeHead(404)
    res.end(json.encode({ product: undefined, collection }))
  }
}
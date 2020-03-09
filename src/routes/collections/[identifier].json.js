import json from 'json-complete'
import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params
	const [collections, materials] = await Promise.all([
    contentful.getEntries({ content_type: 'collection', locale, select: 'sys.id,fields.title,fields.identifier,fields.description,fields.products', 'fields.identifier': identifier }),
    contentful.getEntries({ content_type: 'material', locale, select: 'sys.id,fields.name,fields.description,fields.photo,fields.color'})
  ])

  if (collections.total) {
    res.end(json.encode({ collection: collections.items[0], materials }))
  } else {
    res.writeHead(404)
    res.end(json.encode({ collection: undefined }))
  }
}
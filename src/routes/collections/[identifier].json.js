import json from 'json-complete'
import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params
	const collections = await contentful.getEntries({ content_type: 'collection', locale, select: 'sys.id,fields.title,fields.identifier,fields.description,fields.products', 'fields.identifier': identifier })

  if (collections.total) {
    res.end(json.encode({ collection: collections.items[0] }))
  } else {
    res.writeHead(404)
    res.end(json.encode({ collection: undefined }))
  }
}
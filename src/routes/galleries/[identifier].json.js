import json from 'json-complete'
import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params
	const galleries = await contentful.getEntries({ content_type: 'gallery', locale, select: 'sys.id,fields.title,fields.identifier,fields.description,fields.photos', 'fields.identifier': identifier })

  if (galleries.total) {
    res.end(json.encode({ gallery: galleries.items[0] }))
  } else {
    res.writeHead(404)
    res.end(json.encode({ gallery: undefined }))
  }
}
import json from 'json-complete'
import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params

	const workshops = await contentful.getEntries({ content_type: 'workshop', locale, select: 'sys.id,fields.title,fields.identifier,fields.description,fields.photos', 'fields.identifier': identifier })

  if (workshops.total) {
    res.end(json.encode({ workshop: workshops.items[0] }))
  } else {
    res.writeHead(404)
    res.end(json.encode({ workshop: undefined }))
  }
}
import json from 'json-complete'
import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params
	const pages = await contentful.getEntries({ content_type: 'page', locale, select: 'sys.id,fields.title,fields.identifier,fields.body', 'fields.identifier': identifier })

  if (pages.total) {
    res.end(json.encode({ page: pages.items[0] }))
  } else {
    res.writeHead(404)
    res.end(json.encode({ page: undefined }))
  }
}
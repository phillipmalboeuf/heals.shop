import json from 'json-complete'
import contentful from '../../clients/contentful'

export async function get({ locale }, res) {
	const workshops = await contentful.getEntries({ content_type: 'workshop', locale, select: 'sys.id,fields.title,fields.identifier,fields.description', order: 'fields.date' })

  res.end(json.encode({ workshops }))
}
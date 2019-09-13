import json from 'json-complete'
import contentful from '../clients/contentful'

export async function get({ locale }, res) {
	const [collections, columns] = await Promise.all([
    contentful.getEntries({ content_type: 'collection', locale, select: 'sys.id,fields.title,fields.identifier,fields.onHomepage,fields.description,fields.products', 'fields.onHomepage': true }),
    contentful.getEntries({ content_type: 'column', locale, select: 'sys.id,fields.title,fields.onHomepage,fields.body,fields.photos,fields.alignment', 'fields.onHomepage': true })
  ])


  res.end(json.encode({ collection: collections.items[0], column: columns.items[0] }))
}
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import { json, raw } from 'body-parser';
import * as sapper from '@sapper/server';

import contentful from './clients/contentful'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const content = locale => async (req, res, next) => {
	req.locale = locale
	req.content = await Promise.all([
		contentful.getEntries({ content_type: 'navigation', locale, select: 'sys.id,fields.title,fields.isInThe,fields.links' }),
		contentful.getAsset('oayQJyFWpvlhupFKAQIa6')
	]).then(async ([navigations, logo])=> {
		return {
			logo,
			headerNavigation: navigations.items.find(nav => nav.fields.isInThe === 'Header'),
			footerNavigation: navigations.items.find(nav => nav.fields.isInThe === 'Footer')
		}
	})

	next()
}

polka()
	.use(
		'/raw',
		raw({ type: 'application/json' }),
		sapper.middleware()
	)
	.use(
		content('en-US'),
		json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
				return {
					locale: req.locale,
					content: req.content
				}
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

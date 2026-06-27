import {
	createMessageCtx,
	intl,
	plural,
} from './utils/messages/createMessageCtx'
import { configSingle } from './utils/messages/createMessages'

export const createMessages = configSingle('en')

const getCtx = createMessageCtx({
	plural: plural(),
	number: intl('NumberFormat', {}, 'format'),
})

export const globalMessages = createMessages(getCtx, {
	home: 'Home',
	blog: 'Blog',
	blogNotFound: 'Blog not found.',
})

import stripeClient from 'stripe'
import { CONF } from '../../config/config'

const stripe = stripeClient(CONF('STRIPE_PRIVATE_KEY'))
export default stripe
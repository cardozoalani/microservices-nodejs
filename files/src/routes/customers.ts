import express from 'express'
import { checkToken } from '../common'
import customers from './handler/customers'
const router = express.Router()

router.get('/data', checkToken, customers.showCustomers)

export default router

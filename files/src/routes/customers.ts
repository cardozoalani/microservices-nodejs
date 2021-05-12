import express from 'express'
import { checkToken } from '../common'
import { body } from 'express-validator'
import { validateRequest } from '../common'

import customers from './handler/customers'
const router = express.Router()

router.get('/data', checkToken, customers.showCustomers)
router.post(
  '/data',
  [
    body('name').not().isEmpty().withMessage('name is required'),
    body('segment1').not().isEmpty().isBoolean().withMessage('segment1 is required'),
    body('segment2').not().isEmpty().isBoolean().withMessage('segment2 is required'),
    body('segment3').not().isEmpty().isBoolean().withMessage('segment3 is required'),
    body('segment4').not().isEmpty().isBoolean().withMessage('segment4 is required'),
    body('platformId').not().isEmpty().isNumeric().withMessage('platformId is required'),
    body('clientId').not().isEmpty().isNumeric().withMessage('clientId is required')
  ],
  validateRequest,
  checkToken,
  customers.newCustomer
)

export default router

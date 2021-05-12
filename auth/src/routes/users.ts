import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../common'
import user from './handler/user'
const router = express.Router()

router.post(
  '/signup',
  [
    body('username').trim().notEmpty().withMessage('Username must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  user.signup
)

router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('Username must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  user.login
)

export default router

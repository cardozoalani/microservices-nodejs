import express from 'express'
import { checkToken, uploadS3 } from '../common'
import files from './handler/files'
const router = express.Router()

router.post('/file', checkToken, uploadS3.array('files'), files.loadFile)

router.get('/file', checkToken, files.downloadFile)
export default router

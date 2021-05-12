import multerS3 from 'multer-s3'
import multer from 'multer'
import { v5 as uuid } from 'uuid'
const AWS = require('aws-sdk')

let s3 = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
  Bucket: process.env.BUCKET_NAME,
  signatureVersion: 'v4',
  region: 'us-east-2'
})

export const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    //@ts-ignore
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, uuid('file', uuid.DNS) + '-' + file.originalname)
    }
  })
})

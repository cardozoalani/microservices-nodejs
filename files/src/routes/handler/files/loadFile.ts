import { Request, Response } from 'express'
import { Files } from '../../../models/files'
import { BadRequestError } from '../../../common'

interface File {
  originalname?: string
  mimetype?: string
  size?: number
  key?: string
  contentType?: string
  location?: string
}
export default async (req: Request, res: Response) => {
  if (!req.files || req.files.length === 0) {
    throw new BadRequestError('Please send a file')
  }
  //@ts-ignore
  const fileLocation = req.files.map((data: File) => data.location)[0]
  //@ts-ignore
  const fileNameOriginal = req.files.map((data: File) => data.originalname)[0]

  const existFile = await Files.findOne({ name: fileNameOriginal })

  try {
    if (!existFile) {
      const file = await Files.build({
        name: fileNameOriginal,
        url: fileLocation,
        createdBy: req.session
      })
      await file.save()
      res.status(200).send(file)
    }
    existFile?.set({
      url: fileLocation,
      createdBy: req.session
    })
    await existFile?.save()
    res.status(200).send(existFile)
  } catch (error) {
    throw new BadRequestError('An error occurred while loading the file')
  }
}

import { Request, Response } from 'express'
import { Files } from '../../../models/files'
import { BadRequestError } from '../../../common'

export default async (req: Request, res: Response) => {
  const { fileName } = req.query
  //@ts-ignore
  const file = await Files.findOne({ name: fileName })
  if (!file) {
    throw new BadRequestError(`File not found: ${fileName}`)
  }
  try {
    res.set({
      Location: file.url
    })
    //@ts-ignore
    res.redirect(file.url)
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

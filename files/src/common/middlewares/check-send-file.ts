import { Request, Response, NextFunction } from 'express'

export const checkFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      errors: [{ message: 'No files were uploaded.' }]
    })
  }
  next()
}

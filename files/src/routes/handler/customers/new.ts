import { Request, Response } from 'express'
import { Customer } from '../../../models/customer'

export default async (req: Request, res: Response) => {
  const { name, segment1, segment2, segment3, segment4, platformId, clientId } = req.body

  try {
    const customers = await Customer.build({
      name,
      segment1,
      segment2,
      segment3,
      segment4,
      platformId,
      clientId
    })
    await customers.save()
    res.status(201).send(customers)
  } catch (error) {
    console.error(error)
  }
}

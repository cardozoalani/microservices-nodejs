import { Request, Response } from 'express'
import { Customer } from '../../../models/customer'
import { BadRequestError } from '../../../common'

const limit_ = 10
const page_ = 1
export default async (req: Request, res: Response) => {
  const { page = page_, sort, sortField = 'clientId', limit = limit_ } = req.query

  const aggregate_options = []
  //@ts-ignore
  const lim = parseInt(limit)
  //@ts-ignore
  const pag = parseInt(page)
  const options = {
    page: pag,
    limit: lim,
    collation: { locale: 'en_US', numericOrdering: true },
    customLabels: {
      totalDocs: 'totalDocuments',
      docs: 'customers'
    }
  }

  const sortOrder = sort && sort === 'desc' ? -1 : 1
  //@ts-ignore
  aggregate_options.push({ $sort: { [sortField]: sortOrder } })
  const searchAggregate = Customer.aggregate(aggregate_options)

  try {
    const customers = await Customer.aggregatePaginate(searchAggregate, options)
    res.send(customers)
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

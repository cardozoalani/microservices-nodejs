import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
interface CustomerAttrs {
  name?: string
  segment1?: boolean
  segment2?: boolean
  segment3?: boolean
  segment4?: boolean
  platformId?: number
  clientId?: number
}

interface CustomerModel extends mongoose.Model<CustomerDoc> {
  build(attrs: CustomerAttrs): CustomerDoc
  aggregatePaginate<CustomerDoc>(attrs: CustomerDoc, options: any): any
}

interface CustomerDoc extends mongoose.Document {
  name?: string
  segment1?: boolean
  segment2?: boolean
  segment3?: boolean
  segment4?: boolean
  platformId?: number
  clientId?: number
}

const customerSchema = new mongoose.Schema<CustomerDoc, CustomerModel>(
  {
    name: {
      type: String,
      require: true
    },
    segment1: {
      type: Boolean,
      require: true
    },
    segment2: {
      type: Boolean,
      require: true
    },
    segment3: {
      type: Boolean,
      require: true
    },
    segment4: {
      type: Boolean,
      require: true
    },
    platformId: {
      type: Number,
      require: true
    },
    clientId: {
      type: Number,
      require: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret._id
        delete ret.__v
      }
    }
  }
)

customerSchema.statics.build = (atts: CustomerAttrs) => {
  return new Customer(atts)
}
customerSchema.plugin(aggregatePaginate)

const Customer = mongoose.model<CustomerDoc, CustomerModel>('Customer', customerSchema, 'customers')

export { Customer }

import mongoose from 'mongoose'

interface FilesAttrs {
  name?: string
  url?: string
  createdBy?: mongoose.Types.ObjectId
}

interface FilesModel extends mongoose.Model<FilesDoc> {
  build(attrs: FilesAttrs): FilesDoc
}

interface FilesDoc extends mongoose.Document {
  name?: string
  url?: string
  createdBy?: mongoose.Types.ObjectId
}

const customerSchema = new mongoose.Schema<FilesDoc, FilesModel>({
  name: {
    type: String,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    require: true
  }
})

customerSchema.statics.build = (atts: FilesAttrs) => {
  return new Files(atts)
}

const Files = mongoose.model<FilesDoc, FilesModel>('Files', customerSchema, 'files')

export { Files }

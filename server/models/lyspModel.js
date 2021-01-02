import mongoose from 'mongoose'

export const logSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
})

const lyspSchema = mongoose.Schema(
  {
    auth: {
      type: String,
      required: true,
    },
    log: [logSchema],
  },
  {
    timestamps: true,
  }
)

const lyspModel = mongoose.model('lysps', lyspSchema)

export default lyspModel

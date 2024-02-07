import mongoose from 'mongoose'

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL)
  } catch (error) {
    console.log(error)
  }
}

const db = mongoose.connection

db.once('open', () => {
  console.log('Connected to MongoDB')
})

db.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

export default connect
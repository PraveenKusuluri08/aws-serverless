const mongoose = require("mongoose")
mongoose.Promise = global.Promise

module.exports = DbConnection = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

import Mongoose from "mongoose";

Mongoose.connect("mongodb://127.0.0.1:27017/si-alumni", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Terhubung ke Database");
  })
  .catch(err => {
    console.log(`Error connected to database: ${err}`);
  });

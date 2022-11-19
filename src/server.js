const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
const users = require('./router/users')
const blog = require('./router/blog');
const auth = require("./middleware/auth");
require('dotenv').config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/user",users)
app.use("/",blog)

mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

app.listen(port, () => {
  console.log(`server connected at port ${port}`);
});

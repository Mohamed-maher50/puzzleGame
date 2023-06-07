const mongoose = require("mongoose");

mongoose
  .connect(process.env.mongodbAtls, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });

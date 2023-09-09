const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const env = require("dotenv");
const { ProtectRoute } = require("./utils/ProtectRoute");
const app = express();
env.config();
require("./db/connection");
//server configuration
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors("*"));
app.use(morgan("tiny"));
app.use(express.json());
app.get("/", (req, res) => res.send("server is running successful"));
// routes
app.use("/auth/", require("./routes/Auth"));
app.use("/api/game", ProtectRoute, require("./routes/Game"));
app.use("/api/user", ProtectRoute, require("./routes/users"));
app.use((req, res) => res.status(404).json({ msg: "this router not found" }));
app.listen(process.env.PORT, () => {
  console.log("you listen in port 4000");
});

const express = require("express");
const cors = require("cors")
require("dotenv").config();
require("./config/db");
const userRoutes = require("./routes/routes");

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/", userRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});

require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");

// middlewares
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);
/**
 * The server returned a "405 Method Not Allowed".

Something is broken. Please let us know what you were doing when this error occurred. We will fix it as soon as possible. Sorry for any inconvenience caused. 
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Go and fix the bug in  html2pdf.js library
// route middlewares
app.use("/auth", require("./routes/authRoute"));
app.use("/ticket", require("./routes/bookRoute"));
app.use("/", require("./routes/general"));
//
// server connection
const PORT = process.env.PORT || 9000;
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
start();

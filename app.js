const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const logger = require("./utils/logger.utils");
const authRoutes = require("./routes/admin.router");
const userRoutes = require("./routes/user.router");
const configRoutes = require("./routes/config.router");
const cashRoutes = require("./routes/cash.router");
const { validateRequestBody } = require("./middleware/req.validator");
const { httpMethodNotImplementedResponse } = require("./utils/response.utils");
const PORT = process.env.PORT;
const app = express();

// middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use(validateRequestBody);
app.use("/auth", authRoutes);
app.use("/configs", configRoutes);
app.use("/cash", cashRoutes);
app.use("/users", userRoutes);

app.use("/", (req, res) => {
  const response = httpMethodNotImplementedResponse("Invalid Request Method");
  logger.warn(`URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
  res.status(response.code).send(response);
});

// Server starting
app.listen(PORT, () => {
  logger.info(`Server started and listening on port ${PORT}`);
});

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { PORT } = require("./src/lib/config");

// Middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

// Declare api routes
app.use("/api", require("./src/api/routes"));

// Custom error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
    stack: err.stack || null,
  });
});

server.listen(PORT, () => console.log(`Listening to port ${PORT}`));

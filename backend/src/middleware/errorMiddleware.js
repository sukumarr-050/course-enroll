import { StatusCodes } from "http-status-codes";

export const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: `Route not found: ${req.originalUrl}`
  });
};

export const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }

  if (err.code === 11000) {
    return res.status(StatusCodes.CONFLICT).json({ message: "Duplicate value error" });
  }

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({
    message: err.message || "Internal Server Error"
  });
};

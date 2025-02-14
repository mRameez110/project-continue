const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const errorMessage = err.message || "Something Bad";
  const errorCode = err.errorCode || 500;

  res.status(errorCode).json({
    status: false,
    message: errorMessage,
    data: null,
  });
};

module.exports = errorHandler;

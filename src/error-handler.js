const serverError = () => {
  const env = process.env.NODE_ENV || 'development';

  return (err, req, res, next) => {
    res.status(500);

    if (env === 'development') {
      res.json(err);
    }
    res.json({
      error: {
        code: 500,
        message: 'SERVER_ERROR',
      },
    });
    next();
  };
};

const pageNotFound = () => (req, res) => {
  res.status(404);
  res.json({
    error: {
      code: 404,
      message: 'RESOURCE_DOES_NOT_EXIST',
    },
  });
};

module.exports = {
  pageNotFound,
  serverError,
};

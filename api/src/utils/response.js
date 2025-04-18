const response = (handler) => (req, res, next) => {
  handler(req, res, next).catch((error) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(error);
    }

    res.status(error.status || 500);
    res.send({ error: "An unexpected error occurred." });
  });
};

module.exports = response;

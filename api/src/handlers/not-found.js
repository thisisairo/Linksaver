exports.notFound = (req, res) => {
  res.status(404).send({
    error: `Not Found: ${req.originalUrl}`,
  });
};

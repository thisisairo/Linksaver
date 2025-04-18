const { notFound } = require("../handlers/not-found");

const baseRoutes = require("./base");

module.exports = (app) => {
  app.use("/", baseRoutes);

  // 404 fallback
  app.use(notFound);
};

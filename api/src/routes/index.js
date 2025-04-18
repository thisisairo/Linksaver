const { notFound } = require("../handlers/not-found");

const baseRoutes = require("./base");
const authRoutes = require("./auth");

module.exports = (app) => {
  app.use("/", baseRoutes);
  app.use("/auth", authRoutes);

  // 404 fallback
  app.use(notFound);
};

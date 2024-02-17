const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors, etc.)
server.use(middlewares);

// Add custom routes before JSON Server router
server.post("/collaborator", (req, res, next) => {
  // Custom registration logic
  res.jsonp({ success: true });
});

// Use default router
server.db = router.db;
server.use(auth);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

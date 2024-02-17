const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set up middlewares
server.use(middlewares);

// Add your custom routes (if any) before authentication middleware

// Use authentication middleware
server.db = router.db;
server.use(auth);

// Use JSON Server router
server.use(router);

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`JSON Server with authentication is running on port ${PORT}`);
});

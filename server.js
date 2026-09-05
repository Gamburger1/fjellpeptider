// Entry point for cPanel/Passenger hosting (Shinjiru), which requires a
// single JS file to import rather than running an npm script directly.
// Not used for local dev or Vercel — those run `next dev` / `next start`.
const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> Server listening on port ${port}`);
  });
});

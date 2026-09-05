// One-off build runner for cPanel's "Run JS Script" button (CloudLinux
// NodeJS Selector), used since this hosting plan has no terminal access.
// Click "Run JS script" in Setup Node.js App and point it at this file.
const { execSync } = require("child_process");

execSync("node_modules/.bin/next build", {
  stdio: "inherit",
  cwd: __dirname,
});

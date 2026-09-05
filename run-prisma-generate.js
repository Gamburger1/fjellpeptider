// One-off Prisma client generator for cPanel's "Run JS Script" button.
// npm install's postinstall hook runs `prisma generate` from a cwd that
// doesn't match the Application Root on this host, so it can't find the
// schema via the default relative lookup — this pins an absolute path.
const { execSync } = require("child_process");
const path = require("path");

execSync(
  `node_modules/.bin/prisma generate --schema=${path.join(__dirname, "prisma/schema.prisma")}`,
  { stdio: "inherit", cwd: __dirname },
);

// Quick, instant diagnostic for cPanel's "Run JS Script" — no npm/build
// involved, just confirms what directory this actually executes in.
const fs = require("fs");

console.log("process.cwd():", process.cwd());
console.log("__dirname:", __dirname);
console.log("node version:", process.version);
console.log("files here:", fs.readdirSync(__dirname));
console.log(
  "prisma/schema.prisma exists:",
  fs.existsSync(__dirname + "/prisma/schema.prisma"),
);

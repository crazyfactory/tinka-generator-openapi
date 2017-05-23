import * as fs from "fs";
let webpackCodes: string = fs.readFileSync("index.js").toString();
webpackCodes = "#!/usr/bin/env node\n" + webpackCodes;
fs.writeFile("index.js", webpackCodes, (err) => {
  if (err) throw err;
  console.log("Shebang added!");
});

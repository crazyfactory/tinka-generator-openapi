import * as fs from "fs";
let webpackCodes: string = fs.readFileSync("./cli/index.js").toString();
webpackCodes = "#!/usr/bin/env node\n" + webpackCodes;
fs.writeFile("./cli/index.js", webpackCodes, (err) => {
  if (err) throw err;
  console.log("Shebang added!");
});

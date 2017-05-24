require("./StringHelpers");
import {TypeScriptGenerator} from "./TypeScriptGenerator";

let program = require("commander");
program
  .version('0.0.1')
  .option("-l, --lang [type]", "Language")
  .option("-s, --spec [path]", "Spec file path")
  .parse(process.argv);

if (program.lang === "typescript") {
  new TypeScriptGenerator(program.spec ? `./${program.spec}` : `./spec.json`).generate();
}
else {
  console.log("Sorry! right now we only support typescript!");
}

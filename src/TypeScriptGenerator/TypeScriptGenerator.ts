import * as fs from "fs";
import * as path from "path";

import {BaseGenerator} from "../BaseGenerator";
import {InterfaceGenerator} from "./InterfaceGenerator";
import {TsControllerGenerator} from "./TsControllerGenerator";
import {IGenerator} from "../interfaces";

export class TypeScriptGenerator extends BaseGenerator {
  protected bundle() {
    fs.writeFileSync("sdk/TypeScript/package.json", fs.readFileSync(path.resolve("./src/TypeScriptGenerator/stubs/package.stub")));
    fs.writeFileSync("sdk/TypeScript/tsconfig.json", fs.readFileSync(path.resolve("./src/TypeScriptGenerator/stubs/tsconfig.stub")));
  }

  public generate() {
    const interfaceString = this.generateModels();
    const controllersString = this.generateApis();
    const sdk = interfaceString + controllersString;
    fs.writeFileSync("sdk/TypeScript/src/sdk.ts", sdk);
    this.bundle();
    console.log("Sdk generate, you can run npm install && npm run build && npm publish");
  }

  protected generateModels() {
    const generator: IGenerator = new InterfaceGenerator(this.apiData);
    return generator.generate();
  }

  protected generateApis(): string {
    const tsGenerator: IGenerator = new TsControllerGenerator(this.apiControllers);
    return tsGenerator.generateString();
  }
}

import * as fs from "fs";
import * as path from "path";
import * as npmRun from 'npm-run';

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
    const sdk_stub = fs.readFileSync(path.resolve("./src/TypeScriptGenerator/stubs/sdk.ts.stub")).toString();
    const sdk = sdk_stub.replace("{SDK_BODY}", interfaceString + controllersString);
    fs.writeFileSync("sdk/TypeScript/src/sdk.ts", sdk);
    this.bundle();
    npmRun.execSync("tsfmt -r ./sdk/TypeScript/src/sdk.ts");
    console.log("Sdk generated, you can now `run npm install && npm run build && npm publish`");
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

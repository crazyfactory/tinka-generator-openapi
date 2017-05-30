import * as fs from "fs";

import {BaseGenerator} from "../BaseGenerator";
import {InterfaceGenerator} from "./InterfaceGenerator";
import {TsControllerGenerator} from "./TsControllerGenerator";
import {IGenerator} from "../interfaces";

export class TypeScriptGenerator extends BaseGenerator {
  protected bundle() {
    // we don't need to bundle it, package.json will be present on sdk consumer repo
    return;
  }

  public generate() {
    const interfaceString = this.generateModels();
    const controllersString = this.generateApis();
    const sdk_stub = TypeScriptGenerator.getSdkStub();
    const sdk = sdk_stub.replace("{SDK_BODY}", interfaceString + controllersString);
    fs.writeFileSync("sdk/TypeScript/src/sdk.ts", sdk);
    this.bundle();
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
  public static getSdkStub(): string {
    return 'import {IFetchRequest, Service} from "@crazyfactory/tinka";\n{SDK_BODY}'
  }
}

import * as fs from "fs";
import {BaseGenerator} from "./BaseGenerator";
import {InterfaceGenerator} from "./InterfaceGenerator";
import {TsControllerGenerator} from "./TsControllerGenerator";
import {IGenerator} from "./interfaces";

export class TypeScriptGenerator extends BaseGenerator {
  protected generateInterfaces() {
    const generator: IGenerator = new InterfaceGenerator(this.apiData);
    generator.generate();
  }

  protected generateControllers(): string {
    const tsGenerator: IGenerator = new TsControllerGenerator(this.apiControllers);
    return tsGenerator.generateString();
  }
}

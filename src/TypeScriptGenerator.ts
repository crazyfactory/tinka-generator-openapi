import {BaseGenerator} from "./BaseGenerator";
import {InterfaceGenerator} from "./InterfaceGenerator";
import {TsControllerGenerator} from "./TsControllerGenerator";
import {IGenerator} from "./interfaces";

export class TypeScriptGenerator extends BaseGenerator {
  protected generateInterfaces() {
    const generator: IGenerator = new InterfaceGenerator(this.apiData);
    generator.generate();
  }

  protected generateControllers() {
    const tsGenerator: IGenerator = new TsControllerGenerator(this.apiControllers);
    tsGenerator.generate();
  }
}

import {BaseGenerator} from "./BaseGenerator";
import {InterfaceGenerator} from "./InterfaceGenerator";
import {ControllerGenerator} from "./ControllerGenerator";

export class TypeScriptGenerator extends BaseGenerator {
  protected generateInterfaces() {
    const generator: IGenerator = new InterfaceGenerator(this.jsonData);
    generator.generate();
  }

  protected generateControllers() {
    const tsGenerator: IGenerator = new ControllerGenerator(this.jsonData);
    tsGenerator.generate();
  }
}

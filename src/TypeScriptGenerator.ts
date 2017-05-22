import {BaseGenerator} from "./BaseGenerator";

export class TypeScriptGenerator extends BaseGenerator {
    protected generateInterfaces() {
        const generator = new InterfaceGenerator(this.jsonData);
        generator.generate();
    }

    protected generateControllers() {
        throw new Error("Method not implemented.");
    }
}
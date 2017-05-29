import * as fs from "fs";
import * as path from "path";
import {IGenerator} from "../interfaces";

export class InterfaceGenerator implements IGenerator {
  private definitions;

  // todo: cleanup code, add description docs
  constructor(data: any, private prefixInterfaces: string = 'I') {
    this.definitions = data.definitions;
  }

  public generate() {
    return Object.keys(this.definitions).map((interfaceName) => {
      return this.generateInterfaceDefinition(interfaceName, this.definitions[interfaceName], this.prefixInterfaces) + "\n";
    }).join("\n\n");
  }

  public generateInterfaceDefinition(interfaceName: string, definition: any, prefixInterface: string = 'I') {
    interfaceName = prefixInterface + InterfaceGenerator.toPascalCase(interfaceName);
    let interfaceDefinition = fs.readFileSync(path.resolve("./src/TypeScriptGenerator/stubs/interface.stub")).toString();

    // console.log(interfaceName);
    const docBlock = definition.description ? InterfaceGenerator.getDocBlock(definition.description) : '';
    return interfaceDefinition
      .replace("{NAME}", interfaceName)
      .replace("{DESCRIPTION}", docBlock)
      .replace("{BODY}", this.getTypeDefinition(definition));
  }

  private getTypeDefinition(definition): string {
    let typeBody = [];
    // type is always object
    Object.keys(definition.properties).forEach(key => {
      let required = (definition.required && definition.required.indexOf(key) !== -1) ? '' : '?';
      let doc = definition.properties[key].description ? InterfaceGenerator.getDocBlock(definition.properties[key].description) : undefined;
      typeBody = doc ? typeBody.concat(doc) : typeBody;
      if (definition.properties[key].type === 'array') {
        typeBody = typeBody.concat(key + required + ": " + this.prefixInterfaces + InterfaceGenerator.getInterfaceFromReference(definition.properties[key].items["$ref"]) + "[]" + ",");
      } else if (definition.properties[key]["$ref"]) {
        typeBody = typeBody.concat(key + required + ": " + this.prefixInterfaces + InterfaceGenerator.getInterfaceFromReference(definition.properties[key]["$ref"]) + ",");
      } else {
        typeBody = typeBody.concat(key + required + ": " + InterfaceGenerator.transformTypes(definition.properties[key].type !== "object" ? definition.properties[key].type : "any") + ",");
      }
    });
    return typeBody.join("\n\n");
  }

  public static getInterfaceFromReference(ref: string) {
    const parts = ref.split("/");
    return InterfaceGenerator.toPascalCase(parts[parts.length - 1]);
  }

  public static transformTypes(type: string): string {
    switch (type) {
      case 'object':
        return 'any';
      case 'integer':
        return 'number';
      default:
        return type;
    }
  }

  public static getDocBlock(description) {
    return fs.readFileSync(path.resolve("./src/TypeScriptGenerator/stubs/docblock.stub")).toString().replace("{DESCRIPTION}", description);
  }

  public static toPascalCase(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/(\_\w)/g, function (m) {
      return m[1].toUpperCase();
    });
  }

}

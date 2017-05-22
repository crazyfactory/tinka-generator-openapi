import * as fs from "fs";
import * as jsome from "jsome";
import * as path from "path";

export class InterfaceGenerator implements IGenerator {
  private definitions;

  // todo: cleanup code, add required attributes, add description document
  constructor(data: any, private prefixInterfaces: string = 'I') {
    this.definitions = data.definitions;
  }

  public generate() {
    jsome(this.definitions);
    Object.keys(this.definitions).forEach((interfaceName) => {
      this.generateInterfaceDefinition(interfaceName, this.definitions[interfaceName], this.prefixInterfaces);
    })
  }

  public generateInterfaceDefinition(interfaceName: string, definition: any, prefixInterface: string = 'I') {
    interfaceName = prefixInterface + InterfaceGenerator.toPascalCase(interfaceName);
    let interfaceDefinition = fs.readFileSync(path.resolve("./src/interface.stub")).toString();

    // console.log(interfaceName);
    const docBlock = definition.description ? InterfaceGenerator.getDocBlock(definition.description) : '';
    return interfaceDefinition
      .replace("{NAME}", interfaceName)
      .replace("{DESCRIPTION}", docBlock)
      .replace("{BODY}", this.getTypeDefinition(definition));
  }

  private getTypeDefinition(definition): string {
    let typeBody = [];
    if (definition.type === 'object') {
      Object.keys(definition.properties).forEach(key => {
        if (definition.properties[key].type === 'array') {
          typeBody = typeBody.concat(key + ": " + this.prefixInterfaces + InterfaceGenerator.toPascalCase(InterfaceGenerator.getInterfaceFromReference(definition.properties[key].items["$ref"])) + "[]");
        } else if (definition.properties[key]["$ref"]) {
          typeBody = typeBody.concat(key + ": " + this.prefixInterfaces + InterfaceGenerator.toPascalCase(InterfaceGenerator.getInterfaceFromReference(definition.properties[key]["$ref"].split("/"))));
        } else {
          typeBody = typeBody.concat(key + ": " + InterfaceGenerator.transformTypes(definition.properties[key].type !== "object" ? definition.properties[key].type : "any"));
        }

      })
    }
    return typeBody.join(",\n");
  }

  public static getInterfaceFromReference(ref: string) {
    const parts = ref.split("/");
    return parts[parts.length - 1];
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
    return fs.readFileSync(path.resolve("./src/docblock.stub")).toString().replace("{DESCRIPTION}", description);
  }

  public static toPascalCase(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/(\_\w)/g, function (m) {
      return m[1].toUpperCase();
    });
  }

}

import * as fs from "fs";
import * as path from "path";
import {IApiController, IApiData, IApiMethod} from "./interfaces";
import {GeneratorHelpers} from "./GeneratorHelpers";

export abstract class BaseGenerator {
  protected abstract generateInterfaces();
  protected abstract generateControllers();
  protected apiData: IApiData;
  protected emptyApiControllers: IApiController[];
  protected apiControllers: IApiController[];
  protected apiMethods: IApiMethod[];

  constructor(file: string) {
    const data: string = fs.readFileSync(path.resolve(file)).toString();
    this.apiData = JSON.parse(data);
    this.emptyApiControllers = GeneratorHelpers.getEmptyApiControllers(this.apiData.paths);
    this.apiMethods = GeneratorHelpers.getApiMethods(this.apiData.paths);
    this.apiControllers = GeneratorHelpers.getApiControllers(this.emptyApiControllers, this.apiMethods);
  }

  public generate() {
    // todo: move this to TypeScriptGenerator.ts this belongs there. Not here.
    const interfaceString = this.generateInterfaces();
    const controllersString = this.generateControllers();
    const sdk = interfaceString + controllersString;
    fs.writeFile("sdk/TypeScript/src/sdk.ts", sdk, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    fs.writeFileSync("sdk/TypeScript/package.json", fs.readFileSync(path.resolve("./src/package.stub")));
    fs.writeFileSync("sdk/TypeScript/tsconfig.json", fs.readFileSync(path.resolve("./src/tsconfig.stub")));
  }
}

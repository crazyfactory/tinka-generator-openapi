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
    const interfaceString = this.generateInterfaces();
    const controllersString = this.generateControllers();

    fs.writeFile("generated-api.ts", controllersString, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });

    fs.writeFile("generated-interface.ts", interfaceString, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  }
}

import * as fs from "fs";
import * as path from "path";
import {HttpMethod, IApiController, IApiMethod, ICode, IGenerator, IParams} from "../interfaces";
import {Code} from "../Code";
import {TypeScriptGenerator} from "./TypeScriptGenerator";

export class TsControllerGenerator implements IGenerator {
  private apiControllers: IApiController[];
  public prefix = "I";
  constructor(apiControllers: IApiController[]) {
    this.apiControllers = apiControllers;
  }

  public generate(): void {

  }

  public generateString(): string {
    let codeString: string = "";
    const codes: ICode[] = this.generateApiControllerNodes();
    for(let code of codes) {
      codeString += code.toString() + "\n";
    }
    return codeString + this.generateControllerService();
  }
  public generateControllerService()
  {
    const shopServiceStub = TsControllerGenerator.getServiceStub();
    const serviceMethodStub = TsControllerGenerator.getServiceMethodStub();
    return shopServiceStub.replace("{DEFINITION}", this.apiControllers.map(api => {
      // replace doesn't replace all occurrence, so use regular expression (since this is not on production, we don't need to worry about performance)
      return serviceMethodStub.replace("{CONTROLLER}", api.name).replace(new RegExp("{CONTROLLER_NODE}", "g"), api.name.toPascalCase() + "Node");//api.name;
    }).join("\n"));
  }

  public generateApiControllerNodes(): ICode[] {
    let controllerCodes: ICode[] = [];
    for (let apiController of this.apiControllers) {
      let controllerCode: ICode = new Code(`export class ${apiController.name.toPascalCase()}Node extends Service`);
      for (let apiMethod of apiController.methods) {
        controllerCode.addChild(this.generateApiMethodCode(apiMethod));
      }
      controllerCodes.push(controllerCode);
    }
    return controllerCodes;
  }

  public generateApiMethodCode(apiMethod: IApiMethod): ICode {
    let paramsAndOptions: string = "";
    if (apiMethod.allParams.length) {
      const paramsDef = TsControllerGenerator.getParamsDefinition(apiMethod.allParams);
      paramsAndOptions = `params: ${paramsDef}, options?: IFetchRequest`;
    }
    else {
      paramsAndOptions = `options?: IFetchRequest`;
    }

    const returnType = `Promise<${this.prefix + apiMethod.returnType.toPascalCase()}>`;
    let parent: ICode = new Code(`public ${apiMethod.name.toCamelCase()}(${paramsAndOptions}): ${returnType}`);
    let fetchRequestString: string = `return this.client.process({...${this.getFetchRequestString(apiMethod)}, ...options} as IFetchRequest);`;
    let child: ICode = new Code(fetchRequestString);
    parent.addChild(child);
    return parent;
  }

  public static getParamsDefinition(params: IParams[], interfacePrefix: string = "I"): string {
    let paramsDef: string = "{";
    for (let param of params) {
      if (param.type === "integer") param.type = "number";
      paramsDef += ` ${param.name.toCamelCase()}: ${param.type || interfacePrefix + param.schema.toPascalCase()};`;
    }
    paramsDef += " }";
    return paramsDef;
  }

  public getFetchRequestString(apiMethod: IApiMethod): string {
    let fetchRequest: any = {};
    if (apiMethod.url && apiMethod.url.length) {
      fetchRequest.url = "`" + apiMethod.url + "`";
    }
    if (apiMethod.url && apiMethod.url.length && apiMethod.pathParams.length) {
      for (let pathParam of apiMethod.pathParams) {
        fetchRequest.url = fetchRequest.url.replace("{" + pathParam.name +"}", "${params." + pathParam.name.toCamelCase() + "}");
      }
    }
    if (apiMethod.queryParams.length) {
      fetchRequest.queryParameters = {};
      for (let queryParam of apiMethod.queryParams) {
        fetchRequest.queryParameters[queryParam.name] = `params.${queryParam.name.toCamelCase()}`;
      }
    }
    if (apiMethod.bodyParams.length) {
      let bodyStr: string = "{";
      for (let bodyParam of apiMethod.bodyParams) {
        bodyStr += ` ...params.${bodyParam.name.toCamelCase()},`;
      }
      bodyStr = bodyStr.substr(0, bodyStr.length-1);
      bodyStr += "}";
      fetchRequest.body = `JSON.stringify(${bodyStr})`;
    }
    if (apiMethod.headerParams.length) {
      fetchRequest.headers = {};
      for (let headerParam of apiMethod.headerParams) {
        fetchRequest.headers[headerParam.name] = `params.${headerParam.name.toCamelCase()}`;
      }
    }
    if (apiMethod.httpMethod) {
      fetchRequest.method = `"` + HttpMethod[apiMethod.httpMethod] + `"`;
    }

    return this.convertFetchRequestToString(fetchRequest);
  }

  private convertFetchRequestToString(fetchRequest, addQuoteAroundKey = false): string {
    let result = "{";
    for (let key in fetchRequest) {
      const value = fetchRequest[key];
      if (typeof value === "object") {
        const subValue = this.convertFetchRequestToString(value, key === "headers");
        result += addQuoteAroundKey ? ` "${key}": ${subValue},` : ` ${key}: ${subValue},`;
      }
      else {
        result += addQuoteAroundKey ? ` "${key}": ${value},` : ` ${key}: ${value},`;
      }
    }
    result = result.substr(0, result.length - 1);
    result += " }";
    return result;
  }
  // dirty methods start
  public static getServiceMethodStub() {
    return 'get {CONTROLLER}(): {CONTROLLER_NODE} {\n  return new {CONTROLLER_NODE}(this.client);\n}\n';
  }

  public static getServiceStub() {
    return 'export class ShopService extends Service {\n{DEFINITION}\n}\n';
  }
}

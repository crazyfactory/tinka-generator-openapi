import {HttpMethod, IApiController, IApiMethod, ICode, IGenerator, IParams} from "./interfaces";
import {Code} from "./Code";

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
    const codes: ICode[] = this.generateApiControllerCodes();
    for(let code of codes) {
      codeString += code.toString() + "\n";
    }
    return codeString;
  }

  public generateApiControllerCodes(): ICode[] {
    let controllerCodes: ICode[] = [];
    for (let apiController of this.apiControllers) {
      let controllerCode: ICode = new Code(`export class ${apiController.name.toPascalCase()} extends BaseAPI`);
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
      const paramsDef = this.getParamsDefinition(apiMethod.allParams);
      paramsAndOptions = `params: ${paramsDef}, options?: FetchRequest`;
    }
    else {
      paramsAndOptions = `options?: FetchRequest`;
    }

    const returnType = apiMethod.returnType ? "Promise<"+ this.prefix + apiMethod.returnType.toPascalCase() + ">" : "void";
    let parent: ICode = new Code(`public ${apiMethod.name.toCamelCase()}(${paramsAndOptions}): ${returnType}`);
    let fetchRequestString: string = `return this.client.process({...${this.getFetchRequestString(apiMethod)}, ...options} as FetchRequest);`;
    let child: ICode = new Code(fetchRequestString);
    parent.addChild(child);
    return parent;
  }

  public getParamsDefinition(params: IParams[]): string {
    let paramsDef: string = "{";
    for (let param of params) {
      if (param.type === "integer") param.type = "number";
      paramsDef += ` ${param.name.toCamelCase()}: ${param.type || param.schema.toPascalCase()};`;
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
}

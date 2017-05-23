import {HttpMethod, IApiController, IApiMethod, ICode, IGenerator, IParams} from "./interfaces";
import {Code} from "./Code";

export class TsControllerGenerator implements IGenerator {
  private apiControllers: IApiController[];

  constructor(apiControllers: IApiController[]) {
    this.apiControllers = apiControllers;
  }

  public generate() {

  }

  // public generateApiController(): ICode {
  //
  // }

  // public generateApiMethod(apiMethod: IApiMethod): ICode {
  //   const paramsDef: string = this.getParamsDef(apiMethod.allParams);
  //   let parent: ICode = new Code(`public ${apiMethod.name.toCamelCase()}(params: ${paramsDef}, options?: FetchRequest): Promize<`
  //     + apiMethod.returnType.toPascalCase() + `>`);
  // }

  public getParamsDef(params: IParams[]): string {
    let paramsDef: string = "{";
    for(let param of params) {
      if (param.type === "integer") param.type = "number";
      paramsDef += ` ${param.name.toCamelCase()}: ${param.type || param.schema.toPascalCase()};`;
    }
    paramsDef += " }";
    return paramsDef;
  }

  public getFetchRequest(apiMethod: IApiMethod): string {
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
        bodyStr += ` ...{params.${bodyParam.name.toCamelCase()}},`;
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

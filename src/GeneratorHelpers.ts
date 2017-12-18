import {HttpMethod, IApiMethod, IApiController, IPathsData} from "./interfaces";
import {ApiMethod} from "./models/ApiMethod";

export class GeneratorHelpers {
  public static getApiControllers(emptyApiControllers: IApiController[], apiMethods: IApiMethod[]): IApiController[] {
    for (let emptyApiController of emptyApiControllers) {
      for (let apiMethod of apiMethods) {
        for(let className of apiMethod.classNames) {
          if (emptyApiController.name === className) {
            emptyApiController.methods.push(apiMethod);
            break; // need to add this method only once
          }
        }
      }
    }
    return emptyApiControllers; // this is not empty anymore
  }

  public static getEmptyApiControllers(paths: IPathsData): IApiController[] {
    let controllers: IApiController[] = [];
    let classNames: string[] = [];
    for (let url in paths) {
      for (let httpMethod in paths[url]) {
        paths[url][httpMethod].tags.map((className) => {
          if (classNames.indexOf(className) === -1) {
            controllers.push({
              name: className,
              methods: []
            });
            classNames.push(className);
          }
        });
      }
    }
    return controllers;
  }

  public static getApiMethods(paths: IPathsData): IApiMethod[] {
    let methods: IApiMethod[] = [];
    for (let url in paths) {
      for (let httpMethod in paths[url]) {
        let method: ApiMethod = new ApiMethod();

        method.name = paths[url][httpMethod].operationId;
        method.classNames = paths[url][httpMethod].tags;

        const responses = paths[url][httpMethod].responses;
        const successCodes = ["200", "201", "202", "203", "204", "205", "206", "207", "208", "226"];
        
        for (const successCode of successCodes) {
          if (responses[successCode]) {
            if (successCode === "204") {
              method.returnType = "void";
            }
            else {
              const returnTypeRef = responses[successCode]["schema"]["$ref"];
              method.returnType = returnTypeRef.substr(returnTypeRef.lastIndexOf("/") + 1);
            }
            break;
          }
        }

        if (!method.returnType) {
          throw new Error(`This api method ${method.name} does not define response for success status`);
        }

        method.httpMethod = this.cleanHttpMethod(httpMethod);
        method.allParams = paths[url][httpMethod].parameters;

        if (paths[url][httpMethod].security && paths[url][httpMethod].security.length && paths[url][httpMethod].security[0].basic) {
          method.allParams = [
            ...method.allParams,
            {
              name: "Basic Authentication",
              in: "header"
            }
          ]
        }

        for (let parameter of method.allParams) {
          if (parameter.schema && parameter.schema["$ref"]) {
            const ref = parameter.schema["$ref"];
            parameter.schema = ref.substr(ref.lastIndexOf("/") + 1);
          }
          switch (parameter.in.toUpperCase()) {
            case "PATH":
              method.pathParams.push(parameter);
              break;
            case "BODY":
              method.bodyParams.push(parameter);
              break;
            case "QUERY":
              method.queryParams.push(parameter);
              break;
            case "HEADER":
              method.headerParams.push(parameter);
              break;
            default:
              throw `Unknown param type -> ${parameter.in.toUpperCase()}`;
          }
        }

        method.url = url;

        methods.push(method);
      }
    }
    return methods;
  }

  public static cleanHttpMethod(httpMethod: string): HttpMethod {
    switch (httpMethod.toUpperCase()) {
      case "GET":
        return HttpMethod.GET;
      case "POST":
        return HttpMethod.POST;
      case "PUT":
        return HttpMethod.PUT;
      case "PATCH":
        return HttpMethod.PATCH;
      case "DELETE":
        return HttpMethod.DELETE;
      default:
        throw `Unknown httpMethod -> ${httpMethod.toUpperCase()}`;
    }
  }
}

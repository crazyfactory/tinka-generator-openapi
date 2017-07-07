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
        if (responses["200"] || responses["201"]) {
          const returnTypeRef = responses["200"] ? responses["200"]["schema"]["$ref"] : responses["201"]["schema"]["$ref"];
          method.returnType = returnTypeRef.substr(returnTypeRef.lastIndexOf("/") + 1);
        }
        else if (responses["204"]) {
          method.returnType = "void";
        }
        else {
          throw new Error(`This api method ${method.name} does not define response 200, 201, or 204.`)
        }

        method.httpMethod = this.cleanHttpMethod(httpMethod);
        method.allParams = paths[url][httpMethod].parameters;

        for (let parameter of paths[url][httpMethod].parameters) {
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

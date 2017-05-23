import {HttpMethod, IApiMethod, IApiController, IPathsData} from "./interfaces";
import {ApiMethod} from "./models/ApiMethod";

export class GeneratorHelpers {
  // public static extractControllersInfo(paths: IPathsData): IController[] {
  //
  // }

  public static getAllApiControllers(paths: IPathsData): IApiController[] {
    let controllers: IApiController[] = [];
    let classNames: string[] = [];
    for (let url in paths) {
      for (let httpMethod in paths[url]) {
        paths[url][httpMethod].tags.map((className) => {
          if (classNames.indexOf(className) === -1) {
            controllers.push({
              name: className,
              methods: []
            })
            classNames.push(className);
          }
        })
      }
    }
    return controllers;
  }

  public static getAllApiMethods(paths: IPathsData): IApiMethod[] {
    let methods: IApiMethod[] = [];
    for (let url in paths) {
      for (let httpMethod in paths[url]) {
        let method: ApiMethod = new ApiMethod();

        method.name = paths[url][httpMethod].operationId;
        method.classNames = paths[url][httpMethod].tags;

        const responses = paths[url][httpMethod].responses;
        if (responses["200"]) {
          const returnTypeRef = responses["200"]["schema"]["$ref"];
          method.returnType = returnTypeRef.substr(returnTypeRef.lastIndexOf("/") + 1);
        }

        method.httpMethod = this.cleanHttpMethod(httpMethod);

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
      case "DELETE":
        return HttpMethod.DELETE;
      default:
        throw `Unknown httpMethod -> ${httpMethod.toUpperCase()}`;
    }
  }

  private static
}

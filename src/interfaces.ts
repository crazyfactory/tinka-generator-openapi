export interface IGenerator {
  generate: () => void;
}

export interface IController {
  controllerName: string;
  methods: IApiMethod[];
}

export interface IApiMethod {
  name: string;
  returnType: string;
  httpMethod: "GET" | "POST" | "PUT" | "DELETE";
  methodParams: IParams[];
  queryParams: IParams[];
  bodyParams: IParams[];
}

export interface IParams {
  name: "string",
  type: "string"
}

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
  url: string;
  className: string; // meta data in order to match its class later
}

export interface IParams {
  name: string;
  type: string;
  in?: string;
  description?: string;
  required: true;
}

export interface IPathsData {
  [url:string]: {
    [httpMethod:string]: {
      tags: string[],
      operationId: string,
      produces: string[],
      consumes: string[],
      summary: string,
      description: string;
      responses: any;
      parameters: IParams[];
    }
  }
}

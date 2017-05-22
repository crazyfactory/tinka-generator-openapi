export interface IGenerator {
  generate: () => void;
}

export interface IController {
  name: string;
  methods: IApiMethod[];
}

export interface IApiMethod {
  name: string;
  classNames: string[]; // meta data in order to match its class(es) later
  returnType: string;
  httpMethod: "GET" | "POST" | "PUT" | "DELETE";
  methodParams: IParams[];
  queryParams: IParams[];
  bodyParams: IParams[];
  url: string;
}

export interface IParams {
  name: string;
  type: string;
  in?: string;
  description?: string;
  required?: true;
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

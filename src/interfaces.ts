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
  pathParams: IParams[];
  queryParams: IParams[];
  bodyParams: IParams[];
  url: string;
}

export interface IParams {
  name: string;
  in: string;
  type?: string;
  description?: string;
  required?: true;
  schema?: string;
}

export interface IPathsData {
  [url:string]: {
    [httpMethod: string]: IHttpMethodDetail;
  }
}

export interface IHttpMethodDetail {
  tags: string[],
  operationId: string,
  produces: string[],
  consumes: string[],
  summary: string,
  description: string;
  responses: any;
  parameters: IParams[];
  security?: any;
}

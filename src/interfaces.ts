export interface IGenerator {
  generate: () => void;
}

export interface IApiController {
  name: string;
  methods: IApiMethod[];
}

export interface IApiMethod {
  name: string;
  classNames: string[]; // meta data in order to match its controllers later
  returnType: string;
  httpMethod: HttpMethod;
  pathParams: IParams[];
  queryParams: IParams[];
  bodyParams: IParams[];
  headerParams: IParams[];
  url: string;
}

export enum HttpMethod {"GET", "POST", "PUT", "DELETE"}

export interface IParams {
  name: string;
  in: string;
  type?: string;
  description?: string;
  required?: true;
  schema?: any;
}

export interface IApiData {
  swagger: string;
  info: any;
  host: string;
  basePath: string;
  schemes: string[];
  definitions: any;
  paths: IPathsData;
  externalDocs: any;
  securityDefinitions: any;
}

export interface IPathsData {
  [url:string]: {
    [httpMethod: string]: {
      tags: string[],
      operationId: string,
      produces: string[],
      consumes: string[],
      summary: string,
      description: string;
      responses: any;
      parameters: IParams[];
      security?: any;
    };
  }
}

export interface ICode {
  addChild(code: ICode): void;
  getCodeString(): string;
}

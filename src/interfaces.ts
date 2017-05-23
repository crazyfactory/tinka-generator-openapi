export interface IGenerator {
  generate: () => void;
  generateString?: () => string;
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
  allParams: IParams[];
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
  schema?: string;
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
  children: ICode[];
  addChild(code: ICode): void;
  addLine(line: string): void;
  toString(): string;
}

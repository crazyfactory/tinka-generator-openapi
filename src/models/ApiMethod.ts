import {HttpMethod, IApiMethod, IParams} from "../interfaces";
export class ApiMethod implements IApiMethod{
  public name: string;
  public classNames: string[]; // meta data in order to match its controllers later
  public returnType: string;
  public httpMethod: HttpMethod;
  public pathParams: IParams[];
  public queryParams: IParams[];
  public bodyParams: IParams[];
  public headerParams: IParams[];
  public url: string;

  constructor() {
    this.name = null;
    this.classNames = [];
    this.returnType = null;
    this.httpMethod = null;
    this.pathParams = [];
    this.queryParams = [];
    this.bodyParams = [];
    this.headerParams = [];
    this.url = null;
  }
}

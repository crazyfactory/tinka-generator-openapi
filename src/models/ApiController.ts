import {IApiMethod, IApiController} from "../interfaces";
export class ApiController implements IApiController {
  public name: string;
  public methods: IApiMethod[];

  constructor() {

  }
}

import {IApiMethod, IController} from "../interfaces";
export class ApiController implements IController {
  public name: string;
  public methods: IApiMethod[];

  constructor() {

  }
}

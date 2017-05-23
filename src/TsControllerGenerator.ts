import {IApiController, IApiMethod, IGenerator} from "./interfaces";

export class TsControllerGenerator implements IGenerator {
  private apiControllers: IApiController[];

  constructor(apiControllers: IApiController[]) {
    this.apiControllers = apiControllers;
  }

  public generate() {

  }

  public generateApiController() {

  }

  public generateApiMethod(apiMethod: IApiMethod) {

  }
}

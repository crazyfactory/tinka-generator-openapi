import {IApiMethod, IController, IPathsData} from "./interfaces";

export class GeneratorHelpers {
  public static extractControllersInfo(paths: IPathsData): IController[] {

  }

  public static getAllControllers(paths: IPathsData): IController[] {
    let controllers: IController[] = [];
    for (let url in paths) {
      for (let httpmethod in paths[url]) {
        paths[url][httpmethod].tags.map((className) => {
          controllers.push({
            name: className,
            methods: []
          })
        })
      }
    }
  }

  public static getAllMethods(paths: IPathsData): IApiMethod[] {

  }
}

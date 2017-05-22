import {IApiMethod, IController, IPathsData} from "./interfaces";

export class GeneratorHelpers {
  // public static extractControllersInfo(paths: IPathsData): IController[] {
  //
  // }

  public static getAllControllers(paths: IPathsData): IController[] {
    let controllers: IController[] = [];
    let classNames: string[] = [];
    for (let url in paths) {
      for (let httpMethod in paths[url]) {
        paths[url][httpMethod].tags.map((className) => {
          if (classNames.indexOf(className) === -1) {
            controllers.push({
              name: className,
              methods: []
            })
            classNames.push(className);
          }
        })
      }
    }
    return controllers;
  }

  public static getAllMethods(paths: IPathsData): IApiMethod[] {
    let methods: IApiMethod[] = [];
    for (let url in paths) {

    }
  }
}

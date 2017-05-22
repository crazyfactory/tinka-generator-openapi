import * as fs from "fs";
import * as path from "path";
import {IController} from "./interfaces";

export abstract class BaseGenerator {
  protected abstract generateInterfaces();

  protected abstract generateControllers();

  protected jsonData;

  protected controllersInfo: IController[];

  constructor(file: string) {
    // const data: string = fs.readFileSync(path.resolve(file)).toString();
    // this.jsonData = JSON.parse(data);
    // this.controllersInfo = this.extractControllersInfo(data);
  }

  public generate() {
    this.generateInterfaces();
    this.generateControllers();
  }

  public helloWorld(): string {
    return "Hello World";
  }

  // public extractControllersInfo(jsonData): IController[] {
  //
  // }
}

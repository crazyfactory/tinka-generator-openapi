import {ICode} from "./interfaces";

export class Code implements ICode{
  protected code: string;
  protected children: ICode[];

  constructor(code: string) {
    this.code = code;
    this.children = [];
  }

  public addChild(code: ICode): void {
    this.children.push(code);
  }

  public toString(): string {
    if (this.children.length > 0) {
      return this.code + " {\n" + this.children.map(child => child.toString()).reduce((prev, curr) => prev + "\n" + curr) + "\n}";
    }
    return this.code;
  }
}

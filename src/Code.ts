import {ICode} from "./interfaces";

export class Code implements ICode{
  protected code: string;
  public children: ICode[];

  constructor(firstLine: string) {
    this.code = firstLine;
    this.children = [];
  }

  public addLine(line: string) {
    this.code += `\n${line}`;
  }

  public addChild(code: ICode): void {
    this.children.push(code);
  }

  public toString(): string {
    if (this.children.length > 0) {
      let childrenString = this.children.map(child => child.toString()).reduce((prev, curr) => prev + "\n" + curr);
      childrenString = this.addIndentation(childrenString, 2);
      return this.code + " {\n" + childrenString + "\n}";
    }
    return this.code;
  }

  private addIndentation(str: string, numSpaces: number) {
    let spaces = "";
    for (let i = 0; i < numSpaces; i++) {
      spaces += " ";
    }
    str = spaces + str;
    str = str.replace(/\n/g, "\n" + spaces);
    return str;
  }
}

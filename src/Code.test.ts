import {expect} from "chai";
import {ICode} from "./interfaces";
import {Code} from "./Code";

describe("Code", () => {
  describe("addChild()", () => {
    it("adds child object to children property", () => {
      let code: ICode = new Code("if (true)");
      expect(code.children.length).to.equal(0);
      let child: ICode = new Code("console.log('this is always true!'");
      code.addChild(child);
      expect(code.children.length).to.equal(1);
      expect(code.children.toString()).to.equal("console.log('this is always true!'");
    });
  });

  describe("addLine()", () => {
    it("concats string to this.code into a new line", () => {
      let code: ICode = new Code("console.log('this if first line');");
      code.addLine("console.log('this is second line');");
      expect(code.toString()).to.equal(
        "console.log('this if first line');\n" +
        "console.log('this is second line');"
      );
    })
  });

  describe("toString()", () => {
    it("produces correct codes", () => {
      let parent: ICode = new Code("for (let i = 0; i < 10; i++)");
      let child: ICode = new Code("console.log('in the loop!');");
      let secondChild: ICode = new Code("if (i === 5)");
      let grandChild: ICode = new Code("console.log('in the cond!');");
      parent.addChild(child);
      parent.addChild(secondChild);
      secondChild.addChild(grandChild);
      expect(parent.toString()).to.equal(
        "for (let i = 0; i < 10; i++) {\n" +
        "  console.log('in the loop!');\n" +
        "  if (i === 5) {\n" +
        "    console.log('in the cond!');\n" +
        "  }\n" +
        "}"
      );
    });
  });
});

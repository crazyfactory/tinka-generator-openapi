import {expect} from "chai";
import {ICode} from "./interfaces";
import {Code} from "./Code";

describe("Code", () => {
  describe("toString()", () => {
    it('should produce correct codes', () => {
      let parent: ICode = new Code("for (let i = 0; i < 10; i++)");
      let child: ICode = new Code("console.log('in the loop!');");
      let secondChild: ICode = new Code("if (i === 5)");
      let grandChild: ICode = new Code("console.log('in the cond!');");
      parent.addChild(child);
      parent.addChild(secondChild);
      secondChild.addChild(grandChild);
      expect(parent.toString()).to.equal(
        "for (let i = 0; i < 10; i++) {\n" +
        "console.log('in the loop!');\n" +
        "if (i === 5) {\n" +
        "console.log('in the cond!');\n" +
        "}\n" +
        "}"
      );
    });
  });
});

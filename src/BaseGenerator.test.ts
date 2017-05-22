import {TypeScriptGenerator} from "./TypeScriptGenerator";
import {expect} from 'chai';

describe('Hello function', () => {
  it('should return hello world', () => {
    const generator = new TypeScriptGenerator("");
    expect(generator.helloWorld()).to.equal("Hello World");
  });
});

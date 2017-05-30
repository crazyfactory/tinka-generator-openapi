require("../StringHelpers");
import {InterfaceGenerator} from "./InterfaceGenerator";
import {expect} from 'chai';

describe('Interface Generator', () => {

  it('should be defined', () => {
    expect(InterfaceGenerator).to.exist;
  });

  describe('getInterfaceFromReference() returns interface names from reference strings', () => {

    it('handles snake case', () => {
      expect(InterfaceGenerator.getInterfaceFromReference("#/definitions/error_unit")).to.equal("ErrorUnit");
    });

    it('handles no cases', () => {
      expect(InterfaceGenerator.getInterfaceFromReference("#/definitions/auth")).to.equal("Auth");
    });

    it('handles long references', () => {
      expect(InterfaceGenerator.getInterfaceFromReference("#/definitions/auth/login_request")).to.equal("LoginRequest");
    });

    it('handles camelCase', () => {
      expect(InterfaceGenerator.getInterfaceFromReference("#/definitions/productList")).to.equal("ProductList");
    });

    it('handles PascalCase', () => {
      expect(InterfaceGenerator.getInterfaceFromReference("#/definitions/ProductDescription")).to.equal("ProductDescription");
    })

  });

  describe('getDocBlock()', () => {

    it("returns a description", () => {
      // this test is a weird one as it does a file system read, and it's a little weird to write a doc block test
      expect(InterfaceGenerator.getDocBlock("my description").indexOf("my description")).to.greaterThan(-1)
    })

  });

  describe('toPascalCase() takes snake case and change it to pascal case', () => {

    it('returns PascalCase for pascal_case', () => {
      expect(InterfaceGenerator.toPascalCase('pascal_case')).to.equal("PascalCase");
    });

    it('returns PascalCase for pascal_Case', () => {
      expect(InterfaceGenerator.toPascalCase('pascal_Case')).to.equal("PascalCase");
    });

    it('returns PascalCase for Pascal_Case', () => {
      expect(InterfaceGenerator.toPascalCase('Pascal_Case')).to.equal("PascalCase");
    });

    it('returns PascalCase for PascalCase', () => {
      expect(InterfaceGenerator.toPascalCase('Pascal_Case')).to.equal("PascalCase");
    });

  })

});

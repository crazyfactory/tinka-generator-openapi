import {expect} from "chai";
require("./StringHelpers");

describe("StringHelpers", () => {
  describe("toCamelCase()", () => {
    it("camelizes underscored word", () => {
      expect("categories_list__api".toCamelCase()).to.equal("categoriesListApi");
    });

    it("camelizes hyphenated word", () => {
      expect("categories-list--api".toCamelCase()).to.equal("categoriesListApi");
    });

    it("camelizes spaced word", () => {
      expect("categories list  api".toCamelCase()).to.equal("categoriesListApi");
    });

    it("camelizes pascalized word", () => {
      expect("CategoriesListApi".toCamelCase()).to.equal("categoriesListApi");
    });

    it("does nothing to camelized word", () => {
      expect("categoriesListApi".toCamelCase()).to.equal("categoriesListApi");
    });
  });

  describe("toPascalCase()", () => {
    it("pascalizes underscored word", () => {
      expect("categories_list__api".toPascalCase()).to.equal("CategoriesListApi");
    });

    it("pascalizes hyphenated word", () => {
      expect("categories-list--api".toPascalCase()).to.equal("CategoriesListApi");
    });

    it("pascalizes spaced word", () => {
      expect("categories list  api".toPascalCase()).to.equal("CategoriesListApi");
    });

    it("pascalizes camelized word", () => {
      expect("categoriesListApi".toPascalCase()).to.equal("CategoriesListApi");
    });

    it("does nothing to pascalized word", () => {
      expect("CategoriesListApi".toPascalCase()).to.equal("CategoriesListApi");
    });
  });
})

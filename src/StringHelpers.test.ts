import {expect} from "chai";
require("./StringHelpers");

describe("toCamelCase function", () => {
  it("camelize underscored word", () => {
    expect("categories_list__api".toCamelCase()).to.equal("categoriesListApi");
  });

  it("camelize hyphenated word", () => {
    expect("categories-list--api".toCamelCase()).to.equal("categoriesListApi");
  });

  it("camelize spaced word", () => {
    expect("categories list  api".toCamelCase()).to.equal("categoriesListApi");
  });

  it("camelize pascal word", () => {
    expect("CategoriesListApi".toCamelCase()).to.equal("categoriesListApi");
  });

  it("does nothing to camelized word", () => {
    expect("categoriesListApi".toCamelCase()).to.equal("categoriesListApi");
  });
});

describe("toPascasCase function", () => {
  it("pascasize underscored word", () => {
    expect("categories_list__api".toPascalCase()).to.equal("CategoriesListApi");
  });

  it("pascasize hyphenated word", () => {
    expect("categories-list--api".toPascalCase()).to.equal("CategoriesListApi");
  });

  it("pascasize spaced word", () => {
    expect("categories list  api".toPascalCase()).to.equal("CategoriesListApi");
  });

  it("pascasize camelized word", () => {
    expect("categoriesListApi".toPascalCase()).to.equal("CategoriesListApi");
  });

  it("does nothing to pascasized word", () => {
    expect("CategoriesListApi".toPascalCase()).to.equal("CategoriesListApi");
  });
});

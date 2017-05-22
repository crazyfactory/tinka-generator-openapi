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

  it("camelize pascalized word", () => {
    expect("CategoriesListApi".toCamelCase()).to.equal("categoriesListApi");
  });

  it("does nothing to camelized word", () => {
    expect("categoriesListApi".toCamelCase()).to.equal("categoriesListApi");
  });
});

describe("toPascalCase function", () => {
  it("pascalize underscored word", () => {
    expect("categories_list__api".toPascalCase()).to.equal("CategoriesListApi");
  });

  it("pascalize hyphenated word", () => {
    expect("categories-list--api".toPascalCase()).to.equal("CategoriesListApi");
  });

  it("pascalize spaced word", () => {
    expect("categories list  api".toPascalCase()).to.equal("CategoriesListApi");
  });

  it("pascalize camelized word", () => {
    expect("categoriesListApi".toPascalCase()).to.equal("CategoriesListApi");
  });

  it("does nothing to pascalized word", () => {
    expect("CategoriesListApi".toPascalCase()).to.equal("CategoriesListApi");
  });
});

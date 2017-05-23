import {GeneratorHelpers} from "./GeneratorHelpers";
import {expect} from 'chai';
import {IPathsData, IApiController, IApiMethod, HttpMethod} from "./interfaces";

describe("GeneratorHelpers", () => {
  const paths: IPathsData = {
    "/auth": {
      "post": {
        "tags": [
          "auth"
        ],
        "operationId": "authentication",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Authentication response payload",
        "responses": {
          "200": {
            "description": "Authentication response payload",
            "schema": {
              "$ref":"#/definitions/authentication"
            }
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "401": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": [],
        "security": [
          {
            "basic": []
          }
        ]
      }
    },
    "/auth/delegation": {
      "post": {
        "tags": [
          "auth"
        ],
        "operationId": "delegation",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Authentication response payload",
        "responses": {
          "200": {
            "description": "Authentication response payload",
            "schema": {
              "$ref":"#/definitions/authentication"
            }
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "401": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "422": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "type": "string",
            "description": "Refresh token",
            "required": true
          }
        ]
      }
    },
    "/banks/{code}": {
      "get": {
        "tags": [
          "banks"
        ],
        "operationId": "get-bank-name",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Success response",
        "responses": {
          "204": {
            "description": "Success response with no data"
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "401": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "403": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "422": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": [
          {
            "name": "code",
            "in": "path",
            "type": "string",
            "description": "Code of banks",
            "required": true
          }
        ],
        "security": [
          {
            "bearer": [
              "user"
            ]
          }
        ]
      }
    },
    "/categories": {
      "get": {
        "tags": [
          "categories"
        ],
        "operationId": "categories-list",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Categories list response payload",
        "responses": {
          "200": {
            "description": "Categories list response payload",
            "schema": {
              "$ref":"#/definitions/categories_list"
            }
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": []
      }
    },
    "/categories/{id}": {
      "get": {
        "tags": [
          "categories"
        ],
        "operationId": "categories-detail",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Category details response payload",
        "responses": {
          "200": {
            "description": "Category details response payload",
            "schema": {
              "$ref":"#/definitions/categories_detail"
            }
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "422": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of categories",
            "required": true
          }
        ]
      }
    },
    "/products": {
      "get": {
        "tags": [
          "products"
        ],
        "operationId": "products-list",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Products list response payload",
        "responses": {
          "200": {
            "description": "Products list response payload",
            "schema": {
              "$ref":"#/definitions/products_list"
            }
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "401": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "403": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": [],
        "security": [
          {
            "bearer": [
              "user"
            ]
          }
        ]
      }
    },
    "/products/{id}": {
      "get": {
        "tags": [
          "products"
        ],
        "operationId": "products-detail",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Product details response payload",
        "responses": {
          "200": {
            "description": "Product details response payload",
            "schema": {
              "$ref":"#/definitions/products_detail"
            }
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "401": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "403": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "422": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of products",
            "required": true
          },
          {
            "name": "search",
            "in": "query",
            "type": "string",
            "description": "Search for products",
            "required": true
          }

        ],
        "security": [
          {
            "bearer": [
              "user"
            ]
          }
        ]
      }
    },
    "/zones": {
      "get": {
        "tags": [
          "zones"
        ],
        "operationId": "zones-list",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Zones list response payload",
        "responses": {
          "200": {
            "description": "Zones list response payload",
            "schema": {
              "$ref":"#/definitions/zones_list"
            }
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": []
      },
      "post": {
        "tags": [
          "zones"
        ],
        "operationId": "zones-create",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Zone details response payload",
        "responses": {
          "200": {
            "description": "Zone details response payload",
            "schema": {
              "$ref":"#/definitions/zones_detail"
            }
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "401": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "403": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "422": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": [
          {
            "name": "data",
            "in": "body",
            "required": true,
            "description": "",
            "schema": {
              "$ref":"#/definitions/zones"
            }
          }
        ],
        "security": [
          {
            "bearer": [
              "user"
            ]
          }
        ]
      }
    },
    "/zones/{id}": {
      "get": {
        "tags": [
          "zones"
        ],
        "operationId": "zones-detail",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Zone details response payload",
        "responses": {
          "200": {
            "description": "Zone details response payload",
            "schema": {
              "$ref":"#/definitions/zones_detail"
            }
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "422": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of zones",
            "required": true
          }
        ]
      },
      "put": {
        "tags": [
          "zones"
        ],
        "operationId": "zones-update",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Zone details response payload",
        "responses": {
          "200": {
            "description": "Zone details response payload",
            "schema": {
              "$ref":"#/definitions/zones_detail"
            }
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "422": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of zones",
            "required": true
          },
          {
            "name": "data",
            "in": "body",
            "required": true,
            "description": "",
            "schema": {
              "$ref":"#/definitions/zones"
            }
          }
        ]
      },
      "delete": {
        "tags": [
          "zones"
        ],
        "operationId": "zones-delete",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "summary": "",
        "description": "Success response",
        "responses": {
          "204": {
            "description": "Success response with no data"
          },
          "400": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "500": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          },
          "422": {
            "description": "Error response",
            "schema": {
              "$ref":"#/definitions/error_response"
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of zones",
            "required": true
          }
        ]
      }
    }
  };

  describe("getEmptyApiControllers()", () => {
    it("returns all correct controllers", () => {
      const controllers: IApiController[] = GeneratorHelpers.getEmptyApiControllers(paths);
      const validClassNames: string[] = ["auth", "banks", "categories", "products", "zones"];
      expect(controllers.length).to.equal(validClassNames.length,
        "Expect number of controllers to be equal number of valid class names, but it isn't");
      controllers.map((controller) => {
        expect(validClassNames.indexOf(controller.name) !== -1).to.equal(true,
          `Expect controller whose name is ${controller.name} to exist, but it doesn't.`);
      })
    });
  });

  describe("getApiMethods", () => {
    let methods: IApiMethod[];
    beforeEach(() => {
      methods = GeneratorHelpers.getApiMethods(paths);
    });

    it("returns correct number of methods", () => {
      expect(methods.length).to.equal(12);
    });
    it("returns correct method's name", () => {
      expect(methods[0].name).to.equal("authentication");
    });
    it("returns correct method's classNames", () => {
      expect(methods[0].classNames).to.deep.equal(["auth"]);
    });
    it("returns correct method's returnType", () => {
      expect(methods[0].returnType).to.equal("authentication");
      expect(methods[11].returnType).to.equal(null);
    });
    it("returns correct method's httpMethod", () => {
      expect(methods[8].httpMethod).to.equal(HttpMethod.POST);
      expect(methods[9].httpMethod).to.equal(HttpMethod.GET);
      expect(methods[10].httpMethod).to.equal(HttpMethod.PUT);
      expect(methods[11].httpMethod).to.equal(HttpMethod.DELETE);
    });
    it("returns correct method's queryParams", () => {
      expect(methods[5].queryParams.length).to.equal(0);
      expect(methods[6].queryParams).to.deep.equal([{
        name: "search",
        in: "query",
        type: "string",
        description: "Search for products",
        required: true
      }]);
    });
    it("returns correct method's bodyParams", () => {
      expect(methods[7].bodyParams.length).to.equal(0);
      expect(methods[8].bodyParams).to.deep.equal([{
        name: "data",
        in: "body",
        required: true,
        description: "",
        schema: "zones"
      }]);
    });
    it("returns correct method's headerParams", () => {
      expect(methods[2].headerParams.length).to.equal(0);
      expect(methods[1].headerParams).to.deep.equal([{
        name: "Authorization",
        in: "header",
        type: "string",
        description: "Refresh token",
        required: true
      }]);
    });
    it("throws unknown param", () => {
      const localPaths: IPathsData = {
        "/auth": {
          "post": {
            "tags": [
              "auth"
            ],
            "operationId": "authentication",
            "produces": [
              "application/json"
            ],
            "consumes": [
              "application/json"
            ],
            "summary": "",
            "description": "Authentication response payload",
            "responses": {
              "200": {
                "description": "Authentication response payload",
                "schema": {
                  "$ref":"#/definitions/authentication"
                }
              },
              "400": {
                "description": "Error response",
                "schema": {
                  "$ref":"#/definitions/error_response"
                }
              },
              "500": {
                "description": "Error response",
                "schema": {
                  "$ref":"#/definitions/error_response"
                }
              },
              "401": {
                "description": "Error response",
                "schema": {
                  "$ref":"#/definitions/error_response"
                }
              }
            },
            "parameters": [
              {
                "name": "id",
                "in": "abc",
                "type": "integer",
                "description": "Id of zones",
                "required": true
              }
            ],
            "security": [
              {
                "basic": []
              }
            ]
          }
        }
      };
      expect(GeneratorHelpers.getApiMethods.bind(GeneratorHelpers, localPaths)).to.throw("Unknown param type -> ABC");
    })
    it("returns correct method's url", () => {
      expect(methods[11].url).to.equal("/zones/{id}");
    });
  });

  describe("cleanHttpMethod()", () => {
    it("returns correct httpMethods", () => {
      expect(GeneratorHelpers.cleanHttpMethod("get")).to.equal(HttpMethod.GET);
      expect(GeneratorHelpers.cleanHttpMethod("post")).to.equal(HttpMethod.POST);
      expect(GeneratorHelpers.cleanHttpMethod("put")).to.equal(HttpMethod.PUT);
      expect(GeneratorHelpers.cleanHttpMethod("delete")).to.equal(HttpMethod.DELETE);
    });

    it("throws unknown httpMethod", () => {
      expect(GeneratorHelpers.cleanHttpMethod.bind(null, "abc")).to.throw("Unknown httpMethod -> ABC");
    });
  });
});




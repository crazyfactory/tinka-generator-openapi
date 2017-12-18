require("./StringHelpers");
import {GeneratorHelpers} from "./GeneratorHelpers";
import {expect} from 'chai';
import {IPathsData, IApiController, IApiMethod, HttpMethod} from "./interfaces";
import {SpecialParams} from "./SpecialParams";

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
          "201": {
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

  describe("getApiControllers()", () => {
    it("copy apiMethods into EVERY emptyApiControllers correctly", () => {
      const emptyApiControllers: IApiController[] = [
        {
          name: "products",
          methods: []
        },
        {
          name: "zones",
          methods: []
        }
      ];
      const apiMethods: IApiMethod[] = [
        {
          name: "product-detail",
          classNames: ["products", "zones"],
          returnType: "products_detail",
          httpMethod: HttpMethod.GET,
          allParams: [{
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of products",
            "required": true
          }],
          pathParams: [{
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of products",
            "required": true
          }],
          bodyParams: [],
          queryParams: [],
          headerParams: [],
          url: "/products/{id}"
        }
      ];
      const apiControllers = GeneratorHelpers.getApiControllers(emptyApiControllers, apiMethods);
      expect(apiControllers[0].methods[0]).to.deep.equal(apiMethods[0]);
      expect(apiControllers[1].methods[0]).to.deep.equal(apiMethods[0]);
    });
    it("copy EVERY apiMethods into emptyApiControllers correctly", () => {
      const emptyApiControllers: IApiController[] = [
        {
          name: "products",
          methods: []
        }
      ];
      const apiMethods: IApiMethod[] = [
        {
          name: "product-detail",
          classNames: ["products"],
          returnType: "products_detail",
          httpMethod: HttpMethod.GET,
          allParams: [{
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of products",
            "required": true
          }],
          pathParams: [{
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of products",
            "required": true
          }],
          bodyParams: [],
          queryParams: [],
          headerParams: [],
          url: "/products/{id}"
        },
        {
          name: "product-list",
          classNames: ["products"],
          returnType: "products_detail",
          httpMethod: HttpMethod.GET,
          allParams: [],
          pathParams: [],
          bodyParams: [],
          queryParams: [],
          headerParams: [],
          url: "/products"
        }
      ];
      const apiControllers = GeneratorHelpers.getApiControllers(emptyApiControllers, apiMethods);
      expect(apiControllers[0].methods[0]).to.deep.equal(apiMethods[0]);
      expect(apiControllers[0].methods[1]).to.deep.equal(apiMethods[1]);
    });
    it("does not copy apiMethods into emptyApiControllers if class names are not matched", () => {
      const emptyApiControllers: IApiController[] = [
        {
          name: "categories",
          methods: []
        }
      ];
      const apiMethods: IApiMethod[] = [
        {
          name: "product-detail",
          classNames: ["products"],
          returnType: "products_detail",
          httpMethod: HttpMethod.GET,
          allParams: [{
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of products",
            "required": true
          }],
          pathParams: [{
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of products",
            "required": true
          }],
          bodyParams: [],
          queryParams: [],
          headerParams: [],
          url: "/products/{id}"
        }
      ];
      const apiControllers = GeneratorHelpers.getApiControllers(emptyApiControllers, apiMethods);
      expect(apiControllers[0].methods.length).to.equal(0);
    });
    it("does not copy duplicated apiMethods into emptyApiControllers", () => {
      const emptyApiControllers: IApiController[] = [
        {
          name: "products",
          methods: []
        }
      ];
      const apiMethods: IApiMethod[] = [
        {
          name: "product-detail",
          classNames: ["products", "products"],
          returnType: "products_detail",
          httpMethod: HttpMethod.GET,
          allParams: [{
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of products",
            "required": true
          }],
          pathParams: [{
            "name": "id",
            "in": "path",
            "type": "integer",
            "description": "Id of products",
            "required": true
          }],
          bodyParams: [],
          queryParams: [],
          headerParams: [],
          url: "/products/{id}"
        }
      ];
      const apiControllers = GeneratorHelpers.getApiControllers(emptyApiControllers, apiMethods);
      expect(apiControllers[0].methods.length).to.equal(1);
    });
  });

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

  describe("getApiMethods()", () => {
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
      // 200 response
      expect(methods[7].returnType).to.equal("zones_list");
      // 201 response
      expect(methods[8].returnType).to.equal("zones_detail");
      // 204 response
      expect(methods[11].returnType).to.equal("void");
    });
    it("returns correct method's httpMethod", () => {
      expect(methods[8].httpMethod).to.equal(HttpMethod.POST);
      expect(methods[9].httpMethod).to.equal(HttpMethod.GET);
      expect(methods[10].httpMethod).to.equal(HttpMethod.PUT);
      expect(methods[11].httpMethod).to.equal(HttpMethod.DELETE);
    });
    it("returns correct method's allParams", () => {
      // Basic Auth
      expect(methods[0].allParams).to.deep.equal([{
        name: SpecialParams.BASIC_AUTH,
        in: "header"
      }]);

      expect(methods[10].allParams).to.deep.equal([
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
          "schema": "zones"
        }
      ]);
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
      // Basic Auth
      expect(methods[0].headerParams).to.deep.equal([{
        name: SpecialParams.BASIC_AUTH,
        in: "header"
      }]);
      expect(methods[1].headerParams).to.deep.equal([{
        name: "Authorization",
        in: "header",
        type: "string",
        description: "Refresh token",
        required: true
      }]);
      expect(methods[2].headerParams.length).to.equal(0);
    });
    it("throws missing response", () => {
      const localPaths: IPathsData = {
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
              "500": {
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
        }
      };
      expect(GeneratorHelpers.getApiMethods.bind(GeneratorHelpers, localPaths)).to.throw(
        "This api method products-list does not define response for success status"
      );
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
    });
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




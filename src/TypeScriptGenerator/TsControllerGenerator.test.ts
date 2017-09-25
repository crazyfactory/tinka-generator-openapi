require("../StringHelpers");
import {expect} from "chai";
import {TsControllerGenerator} from "./TsControllerGenerator";
import {HttpMethod, IApiMethod, ICode, IParams, IApiController} from "../interfaces";
import {ApiMethod} from "../models/ApiMethod";

describe("TsControllerGenerator", () => {
  const categoriesListMethod: IApiMethod = {
    name: "categories-list",
    classNames: ["categories"],
    returnType: "categories_list",
    httpMethod: HttpMethod.GET,
    allParams: [],
    pathParams: [],
    queryParams: [],
    bodyParams: [],
    headerParams: [],
    url: "/categories"
  };
  const categoriesDetailMethod: IApiMethod = {
    name: "categories-detail",
    classNames: ["categories"],
    returnType: "categories_detail",
    httpMethod: HttpMethod.GET,
    allParams: [
      {
        "name": "id",
        "in": "path",
        "type": "integer",
        "description": "Id of categories",
        "required": true
      }
    ],
    pathParams: [
      {
        "name": "id",
        "in": "path",
        "type": "integer",
        "description": "Id of categories",
        "required": true
      }
    ],
    queryParams: [],
    bodyParams: [],
    headerParams: [],
    url: "/categories/{id}"
  };
  const zonesUpdateMethod: IApiMethod = {
    name: "zones-update",
    classNames: ["zones"],
    returnType: "zones_detail",
    httpMethod: HttpMethod.PUT,
    allParams: [
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
    ],
    pathParams: [
      {
        "name": "id",
        "in": "path",
        "type": "integer",
        "description": "Id of zones",
        "required": true
      }
    ],
    queryParams: [],
    bodyParams: [
      {
        "name": "data",
        "in": "body",
        "required": true,
        "description": "",
        "schema": "zones"
      }
    ],
    headerParams: [],
    url: "/zones/{id}"
  };
  const zonesDeleteMethod: IApiMethod = {
    name: "zones-delete",
    classNames: ["zones"],
    returnType: "void",
    httpMethod: HttpMethod.DELETE,
    allParams: [
      {
        "name": "id",
        "in": "path",
        "type": "integer",
        "description": "Id of zones",
        "required": true
      }
    ],
    pathParams: [
      {
        "name": "id",
        "in": "path",
        "type": "integer",
        "description": "Id of zones",
        "required": true
      }
    ],
    queryParams: [],
    bodyParams: [],
    headerParams: [],
    url: "/zones/{id}"
  };
  const categoriesController: IApiController = {
    name: "categories",
    methods: [categoriesListMethod, categoriesDetailMethod]
  };
  const zonesController: IApiController = {
    name: "zones",
    methods: [zonesUpdateMethod, zonesDeleteMethod]
  };

  describe("generateApiControllerNodes()", () => {
    let codes: ICode[];

    beforeEach(() => {
      const gen = new TsControllerGenerator([categoriesController, zonesController]);
      codes = gen.generateApiControllerNodes();
    });

    it("writes first line of class correctly", () => {
      const firstControllerString = codes[0].toString();
      expect(firstControllerString.substr(0, firstControllerString.indexOf("\n"))).equal("export class CategoriesNode extends Service {");
    });

    it("contains correct number of controller codes", () => {
      expect(codes.length).to.equal(2);
    });

    it("assigns correct number of method codes to controller codes", () => {
      expect(codes[0].children.length).to.equal(2);
      expect(codes[1].children.length).to.equal(2);
    })
  });

  describe("generateApiMethodCode()", () => {
    it("returns correct api method string", () => {
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.name = "zones-update";
      apiMethod.classNames = ["zones"];
      apiMethod.returnType = "zones_detail";
      apiMethod.httpMethod = HttpMethod.PUT;
      apiMethod.allParams = [
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
        },
        {
          "name": "Content-Type",
          "in": "header",
          "type": "string",
          "description": "Content Type",
          "required": true
        }
      ];
      apiMethod.pathParams = [{
        "name": "id",
        "in": "path",
        "type": "integer",
        "description": "Id of zones",
        "required": true
      }];
      apiMethod.bodyParams = [{
        "name": "data",
        "in": "body",
        "required": true,
        "description": "",
        "schema": "zones"
      }];
      apiMethod.headerParams = [{
          "name": "Content-Type",
          "in": "header",
          "type": "string",
          "description": "Content Type",
          "required": true
      }];
      apiMethod.url = "/zones/{id}";

      const gen = new TsControllerGenerator([]);
      const code: ICode = gen.generateApiMethodCode(apiMethod);

      expect(code.toString()).to.equal(
        "public zonesUpdate(params: { id: number; data: IZones; contentType: string; }, options?: IFetchRequest): Promise<IZonesDetail> {\n" +
        "  return this.client.process({...{ url: `/zones/${params.id}`, body: JSON.stringify({ ...params.data}), headers: { \"Content-Type\": params.contentType }, method: \"PUT\" }, ...options} as IFetchRequest);\n" +
        "}"
      );
    });
    it("returns Promise<void> for void methods", () => {
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.name = "zones-create";
      apiMethod.classNames = ["zones"];
      apiMethod.returnType = "void";
      apiMethod.httpMethod = HttpMethod.POST;
      apiMethod.allParams = [
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
        },
        {
          "name": "Content-Type",
          "in": "header",
          "type": "string",
          "description": "Content Type",
          "required": true
        }
      ];
      apiMethod.pathParams = [{
        "name": "id",
        "in": "path",
        "type": "integer",
        "description": "Id of zones",
        "required": true
      }];
      apiMethod.bodyParams = [{
        "name": "data",
        "in": "body",
        "required": true,
        "description": "",
        "schema": "zones"
      }];
      apiMethod.headerParams = [{
        "name": "Content-Type",
        "in": "header",
        "type": "string",
        "description": "Content Type",
        "required": true
      }];
      apiMethod.url = "/zones/{id}";

      const gen = new TsControllerGenerator([]);
      const code: ICode = gen.generateApiMethodCode(apiMethod);

      expect(code.toString()).to.equal(
        "public zonesCreate(params: { id: number; data: IZones; contentType: string; }, options?: IFetchRequest): Promise<void> {\n" +
        "  return this.client.process({...{ url: `/zones/${params.id}`, body: JSON.stringify({ ...params.data}), headers: { \"Content-Type\": params.contentType }, method: \"POST\" }, ...options} as IFetchRequest);\n" +
        "}"
      );
    });


    it("does not write params if params are empty", () => {
      const gen = new TsControllerGenerator([]);
      const code: ICode = gen.generateApiMethodCode(categoriesListMethod);
      expect(code.toString()).to.contains("public categoriesList(options?: IFetchRequest):");
    });
  });

  describe("getParamsDefinition()", () => {
    it("returns correct params def", () => {
      const gen = new TsControllerGenerator([]);
      const allParams: IParams[] = [
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
        },
        {
          "name": "Authorization",
          "in": "header",
          "type": "string",
          "description": "Refresh token",
          "required": true
        },
        {
          "name": "Content-Type",
          "in": "header",
          "type": "string",
          "description": "Content Type",
          "required": true
        },
        {
          "name": "search",
          "in": "query",
          "type": "string",
          "description": "Search for products",
          "required": true
        }
      ];
      expect(TsControllerGenerator.getParamsDefinition(allParams)).to.equal(`{ id: number; data: IZones; authorization: string; contentType: string; search: string; }`);
    });
  });

  describe("getFetchRequestString()", () => {
    it("returns correct url", () => {
      const gen = new TsControllerGenerator([]);
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.url = "/products";
      expect(gen.getFetchRequestString(apiMethod)).to.equal("{ url: `/products` }");
    });

    it("returns correct url with pathParams", () =>{
      const gen = new TsControllerGenerator([]);
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.url = "/products/{id}";
      apiMethod.pathParams = [{
        "name": "id",
        "in": "path",
        "type": "integer",
        "description": "Id of products",
        "required": true
      }];
      expect(gen.getFetchRequestString(apiMethod)).to.equal("{ url: `/products/${params.id}` }");
    });

    it("returns correct queryParams", () => {
      const gen = new TsControllerGenerator([]);
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.queryParams = [
        {
          "name": "search",
          "in": "query",
          "type": "string",
          "description": "Search for products",
          "required": true
        },
        {
          "name": "secondSearch",
          "in": "query",
          "type": "string",
          "description": "Search for products",
          "required": true
        }
      ];
      expect(gen.getFetchRequestString(apiMethod)).to.equal("{ queryParameters: { search: params.search, secondSearch: params.secondSearch } }");
    });

    it("returns correct bodyParams", () => {
      const gen = new TsControllerGenerator([]);
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.bodyParams = [
        {
          "name": "data",
          "in": "body",
          "required": true,
          "description": "",
          "schema": "zones"
        },
        {
          "name": "secondData",
          "in": "body",
          "required": true,
          "description": "",
          "schema": "zones"
        }
      ];
      expect(gen.getFetchRequestString(apiMethod)).to.equal("{ body: JSON.stringify({ ...params.data, ...params.secondData}) }");
    });

    it("returns correct headerParams", () => {
      const gen = new TsControllerGenerator([]);
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.headerParams = [
        {
          "name": "Authorization",
          "in": "header",
          "type": "string",
          "description": "Refresh token",
          "required": true
        },
        {
          "name": "Content-Type",
          "in": "header",
          "type": "string",
          "description": "Content Type",
          "required": true
        }
      ];
      expect(gen.getFetchRequestString(apiMethod)).to.equal(`{ headers: { "Authorization": params.authorization, "Content-Type": params.contentType } }`);
    });

    it("returns correct httpMethod", () => {
      const gen = new TsControllerGenerator([]);
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.httpMethod = HttpMethod.PUT;
      expect(gen.getFetchRequestString(apiMethod)).to.equal(`{ method: "PUT" }`);
    });

    it("constructs string with multiple keys correctly", () =>{
      const gen = new TsControllerGenerator([]);
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.bodyParams = [
        {
          "name": "data",
          "in": "body",
          "required": true,
          "description": "",
          "schema": "zones"
        },
        {
          "name": "secondData",
          "in": "body",
          "required": true,
          "description": "",
          "schema": "zones"
        }
      ];
      apiMethod.headerParams = [{
        "name": "Authorization",
        "in": "header",
        "type": "string",
        "description": "Refresh token",
        "required": true
      }];
      apiMethod.httpMethod = HttpMethod.POST;
      expect(gen.getFetchRequestString(apiMethod)).to.equal(`{ body: JSON.stringify({ ...params.data, ...params.secondData}), headers: { "Authorization": params.authorization }, method: "POST" }`);
    });
  });
});

import {expect} from "chai";
import {TsControllerGenerator} from "./TsControllerGenerator";
import {HttpMethod, IApiMethod, IParams} from "./interfaces";
import {ApiMethod} from "./models/ApiMethod";

describe("TsControllerGenerator", () => {
  describe("getParamsDef()", () => {
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
      expect(gen.getParamsDef(allParams)).to.equal(`{ id: number; data: Zones; authorization: string; contentType: string; search: string; }`);
    });
  });

  describe("getFetchRequestObject()", () => {
    it("returns correct url", () => {
      const gen = new TsControllerGenerator([]);
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.url = "/products";
      expect(gen.getFetchRequest(apiMethod)).to.equal("{ url: `/products` }");
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
      expect(gen.getFetchRequest(apiMethod)).to.equal("{ url: `/products/${params.id}` }");
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
      expect(gen.getFetchRequest(apiMethod)).to.equal("{ queryParameters: { search: params.search, secondSearch: params.secondSearch } }");
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
      expect(gen.getFetchRequest(apiMethod)).to.equal("{ body: JSON.stringify({ ...{params.data}, ...{params.secondData}}) }");
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
      expect(gen.getFetchRequest(apiMethod)).to.equal(`{ headers: { "Authorization": params.authorization, "Content-Type": params.contentType } }`);
    });

    it("returns correct httpMethod", () => {
      const gen = new TsControllerGenerator([]);
      const apiMethod: IApiMethod = new ApiMethod();
      apiMethod.httpMethod = HttpMethod.PUT;
      expect(gen.getFetchRequest(apiMethod)).to.equal(`{ method: "PUT" }`);
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
      expect(gen.getFetchRequest(apiMethod)).to.equal(`{ body: JSON.stringify({ ...{params.data}, ...{params.secondData}}), headers: { "Authorization": params.authorization }, method: "POST" }`);
    });
  });


});

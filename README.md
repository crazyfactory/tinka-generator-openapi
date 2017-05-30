# tinka-generator-openapi

[![Greenkeeper badge](https://badges.greenkeeper.io/crazyfactory/tinka-generator-openapi.svg)](https://greenkeeper.io/)
This repo takes a spec file and generate ts-http-client sdk

In crazy factory, we have  
1) api -> the actual API that connects to database
2) api-client -> an sdk that provides meaningful classes and methods that call api using ts-http-client
3) shop, erp, logistics, handbag -> use api-client
4) ts-http-client -> technology for stack and talking, but no api specs
5) tinka-generator-openapi -> takes a spec file and generates stuff

Here's the process  
1) each api has its own spec.json file
2) once spec.json in api is updated, spec.json in api-client is automatically updated according to the former one, with meaningful tag.
3) then api-client will use the functionality of tinka-generator-openapi to generate a new sdk according to the updated spec
4) api-client automatically published to NPM (via semantic-release?)

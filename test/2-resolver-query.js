'use strict';

const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');

const apiSchema = fs.readFileSync(path.join(__dirname, './../src/schema', 'schema.graphql'), 'utf8');

describe("Testing Resolvers - Type Root - Query", () => {
    let tester;
    before(function() {
        tester = new EasyGraphQLTester(apiSchema);
    });
    it("Comprobar que 'hello' devuelve correcto", async () => {

    });
});
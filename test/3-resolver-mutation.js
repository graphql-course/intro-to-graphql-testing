'use strict';

const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');

const apiSchema = fs.readFileSync(path.join(__dirname, './../src/schema', 'schema.graphql'), 'utf8');
const resolvers = require('./mocks/resolvers/mutation').resolversMutation;
const expect = require('chai').expect;
describe("Testing Resolvers - Type Root - Mutation", () => {
    let tester;
    before(function() {
        tester = new EasyGraphQLTester(apiSchema, resolvers);
    });
    it("Comprobar que 'add' devuelve correcto", async () => {
        const query = `
            mutation ad($value: String!) {
                add(value: $value)
            }
        `;

        // Hacer el primer test
        const result = await tester.graphql(query, undefined, undefined, { value: "Anartz"});
        // Primer elemento igual a Anartz
        expect(result.data.add[0]).to.equal("Anartz");
        expect(result.data.add).to.have.lengthOf(1);
        // Longitud igual a 1
        const result2 = await tester.graphql(query, undefined, undefined, { value: "Hola"});
        expect(result2.data.add[1]).to.equal("Hola");
        expect(result2.data.add).to.have.lengthOf(2);
        const result3 = await tester.graphql(query, undefined, undefined, { value: "Adios"});
        expect(result3.data.add[2]).to.equal("Adios");
        expect(typeof(result3.data.add[2])).to.equal('string');
        expect(result3.data.add).to.have.lengthOf(3);
    });
});
'use strict';

const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');
const LIST = require('./mocks/data').LIST;
const apiSchema = fs.readFileSync(path.join(__dirname, './../src/schema', 'schema.graphql'), 'utf8');
const resolvers = require('./mocks/resolvers/mutation').resolversMutation;
const expect = require('chai').expect;
describe("Testing Resolvers - Type Root - Mutation", () => {
    let tester;
    before(function() {
        tester = new EasyGraphQLTester(apiSchema, resolvers);
    });
    afterEach(async() => {
        console.log('ejecutar');
        // runs after each test in this block
        const listLength = LIST.length + 1
        for(let i = 0; i < listLength; i++) {
            console.log(LIST)
            LIST.pop();
        }
        console.log('final');
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

    it("Comprobar que 'removeLast' devuelve correcto", async () => {
        console.log(LIST);
        const addQuery = `
            mutation ad($value: String!) {
                add(value: $value)
            }
        `;

        // Hacer el primer test
        await tester.graphql(addQuery, undefined, undefined, { value: "Anartz"});
        // Primer elemento igual a Anartz
        
        // Longitud igual a 1
        await tester.graphql(addQuery, undefined, undefined, { value: "Hola"});
        
        const result = await tester.graphql(addQuery, undefined, undefined, { value: "Adios"});
        expect(result.data.add[2]).to.equal("Adios");
        expect(typeof(result.data.add[2])).to.equal('string');
        expect(result.data.add).to.have.lengthOf(3);
        console.log(result.data.add);
        const removeQuery = `
            mutation {
                removeLast
            }
        `;

        const result2 = await tester.graphql(removeQuery, undefined, undefined, { });
        console.log(result2.data.removeLast);
        expect(result2.data.removeLast[2]).to.equal(undefined);
        expect(typeof(result2.data.removeLast[2])).to.equal('undefined');
        expect(result2.data.removeLast[1]).to.equal('Hola');
        expect(typeof(result2.data.removeLast[1])).to.equal('string');
        expect(result2.data.removeLast).not.to.have.lengthOf(3);
        expect(result2.data.removeLast).to.have.lengthOf(2);
    });
});
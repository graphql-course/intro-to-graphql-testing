'use strict';

const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');

const apiSchema = fs.readFileSync(path.join(__dirname, './../src/schema', 'schema.graphql'), 'utf8');

// const tester =
describe('Test Schema GraphQL', () => {
	let tester;
	before(function() {
		tester = new EasyGraphQLTester(apiSchema);
	});
	describe('Type Root: Query', () => {
		it("Llamada 'hello' válida", () => {
			const query = `
                {
                    hello
                }
            `;
            tester.test(true, query, {});
        });
        it("Llamada 'hello' inválida", () => {
			const query = `
                {
                    hello {
                        id
                        name
                    }
                }
            `;
            tester.test(false, query, {});
        });
        it("Llamada 'helloWithName' válida", () => {
			const query = `
                query helloWithName($name: String!){
                    helloWithName(name: $name)
                }
            `;
            tester.test(true, query, {name: "Anartz"});
        });
        it("Llamada 'helloWithName' inválida", () => {
			const query = `
                query helloWithName($name: String!){
                    helloWithName(name: $name)
                }
            `;
            tester.test(false, query, {});
        });
	});
	describe('Type Root: Mutation', () => {});
});

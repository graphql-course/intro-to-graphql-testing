'use strict';

const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');

const apiSchema = fs.readFileSync(path.join(__dirname, './../src/schema', 'schema.graphql'), 'utf8');

// const tester =
describe('Test Schema GraphQL', () => {
    let tester;
    beforeAll(function() {
		tester = new EasyGraphQLTester(apiSchema);
	});
	describe('Type Root: Query', () => {
		test("Llamada 'hello' válida", () => {
			const query = `
                {
                    hello
                }
            `;
			tester.test(true, query, {});
		});
		test("Llamada 'hello' inválida", () => {
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
		test("Llamada 'helloWithName' válida", () => {
			const query = `
                query helloWithName($name: String!){
                    helloWithName(name: $name)
                }
            `;
			tester.test(true, query, { name: 'Anartz' });
		});
		test("Llamada 'helloWithName' inválida", () => {
			const query = `
                query helloWithName($name: String!){
                    helloWithName(name: $name)
                }
            `;
			tester.test(false, query, {});
		});
		test("Llamada 'helloToGraphQLCourse' válida", () => {
			const query = `
                {
                    helloToGraphQLCourse
                }
            `;
			tester.test(true, query, {});
		});
		test("Llamada 'helloToGraphQLCourse' inválida", () => {
			const query = `
                {
                    helloToGraphQLCourse {
                        id
                        name
                    }
                }
            `;
			tester.test(false, query, {});
		});
		test("Llamada 'list' válida", () => {
			const query = `
                {
                    list
                }
            `;
			tester.test(true, query, {});
		});
		test("Llamada 'list' inválida", () => {
			const query = `
                {
                    list {
                        id
                        name
                    }
                }
            `;
			tester.test(false, query, {});
		});
	});
	describe('Type Root: Mutation', () => {

		test("Llamada 'add' válida", () => {
			const query = `
                mutation addElement($value: String!) {
					add(value: $value)
				}
            `;
			tester.test(true, query, {value: "Anartz"});
		});
		test("Llamada 'add' inválida", () => {
			const query = `
				query addElement($value: String!) {
					add(value: $value)
				}
            `;
			tester.test(false, query, {value: "ddd"});
		});
		test("Llamada 'removeLast' válida", () => {
			const query = `
                mutation {
					removeLast 
				}
            `;
			tester.test(true, query, {});
		});
		test("Llamada 'removeLast' inválida", () => {
			const query = `
				query {
					removeLast
				}
            `;
			tester.test(false, query, {});
		});
		
	});
});

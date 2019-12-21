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
			tester.test(true, query, { name: 'Anartz' });
		});
		it("Llamada 'helloWithName' inválida", () => {
			const query = `
                query helloWithName($name: String!){
                    helloWithName(name: $name)
                }
            `;
			tester.test(false, query, {});
		});
		it("Llamada 'helloToGraphQLCourse' válida", () => {
			const query = `
                {
                    helloToGraphQLCourse
                }
            `;
			tester.test(true, query, {});
		});
		it("Llamada 'helloToGraphQLCourse' inválida", () => {
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
		it("Llamada 'list' válida", () => {
			const query = `
                {
                    list
                }
            `;
			tester.test(true, query, {});
		});
		it("Llamada 'list' inválida", () => {
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

		it("Llamada 'add' válida", () => {
			const query = `
                mutation addElement($value: String!) {
					add(value: $value)
				}
            `;
			tester.test(true, query, {value: "Anartz"});
		});
		it("Llamada 'add' inválida", () => {
			const query = `
				query addElement($value: String!) {
					add(value: $value)
				}
            `;
			tester.test(false, query, {value: "ddd"});
		});
		it("Llamada 'removeLast' válida", () => {
			const query = `
                mutation {
					removeLast 
				}
            `;
			tester.test(true, query, {});
		});
		it("Llamada 'removeLast' inválida", () => {
			const query = `
				query {
					removeLast
				}
            `;
			tester.test(false, query, {});
		});
		
	});
});

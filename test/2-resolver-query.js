'use strict';

const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');
const resolvers = require('./mocks/resolvers/query').resolverQueries;
const apiSchema = fs.readFileSync(path.join(__dirname, './../src/schema', 'schema.graphql'), 'utf8');
const expect = require('chai').expect;
describe('Testing Resolvers - Type Root - Query', () => {
	let tester;
	before(function() {
		tester = new EasyGraphQLTester(apiSchema, resolvers);
	});
	it("Comprobar que 'hello' devuelve correcto y es un string", async () => {
        const query = `
        { 
            hello 
        }`;
		const result = await tester.graphql(query, undefined, undefined, {});

        expect(result.data.hello).to.be.a('string');
        expect(result.data.hello).to.equal('Hello world!!');
    });
    it("Comprobar que 'helloWithName' devuelve correcto y es un string", async () => {
        const query = `
        query hhh($name: String!){ 
            helloWithName(name: $name) 
        }`;
		const result = await tester.graphql(query, undefined, undefined, {name: "GraphQL Course"});

        expect(result.data.helloWithName).to.be.a('string');
        expect(result.data.helloWithName).to.equal('Hello GraphQL Course!!');
    });
    it("Comprobar que 'helloToGraphQLCourse' devuelve correcto y es un string", async () => {
        const query = `
        { 
            helloToGraphQLCourse 
        }`;
		const result = await tester.graphql(query, undefined, undefined, {});

        expect(result.data.helloToGraphQLCourse).to.be.a('string');
        expect(result.data.helloToGraphQLCourse).to.equal('Hello to GraphQL Course!!');
        expect(result.data.helloToGraphQLCourse).not.to.equal('Hello to Course!!');
    });
    it("Comprobar que 'list' devuelve correcto y tiene 0 elementos", async () => {
        const query = `
        { 
            list 
        }`;
		const result = await tester.graphql(query, undefined, undefined, {});
        expect(result.data.list).to.have.lengthOf(0);
    });
});
